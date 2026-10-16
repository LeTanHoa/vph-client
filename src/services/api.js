import { defaultSeedProducts } from '../data/seedData.js';

const API_BASE = '/api';

// Fallback products in case backend is offline
let localFallbackProducts = JSON.parse(JSON.stringify(defaultSeedProducts)).map((p, idx) => ({
  ...p,
  _id: `fallback_${idx + 1}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

// ==========================================
// AUTHENTICATION HELPERS
// ==========================================
const AUTH_KEY = 'vhh_admin_auth';

export function isUserLoggedIn() {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) return false;
    const parsed = JSON.parse(data);
    return Boolean(parsed && parsed.token && parsed.username === 'admin');
  } catch {
    return false;
  }
}

export function saveLoginSession(token, username = 'admin') {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ token, username, loggedAt: Date.now() }));
  } catch (e) {
    console.error('Lỗi lưu session:', e);
  }
}

export function clearLoginSession() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Lỗi xoá session:', e);
  }
}

export async function loginAdmin(username, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Đăng nhập không thành công');
    if (json.success && json.token) {
      saveLoginSession(json.token, username);
    }
    return json;
  } catch (err) {
    // Client-side fallback if server offline
    if (username === 'admin' && password === 'admin') {
      const mockToken = 'fallback_token_' + Date.now();
      saveLoginSession(mockToken, 'admin');
      return { success: true, token: mockToken, user: { username: 'admin' }, message: 'Đăng nhập thành công!' };
    }
    throw err;
  }
}

// ==========================================
// CLOUDINARY UPLOAD HELPER
// ==========================================
export async function uploadImageToCloudinary(base64OrUrl) {
  try {
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64OrUrl, folder: 'vhh_products' })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Lỗi tải ảnh lên Cloudinary');
    return json;
  } catch (err) {
    console.warn('Lỗi khi upload Cloudinary qua API:', err.message);
    // Return base64 as fallback URL so user workflow is uninterrupted
    return {
      success: true,
      url: base64OrUrl,
      storage: 'fallback_base64',
      message: 'Lưu ảnh tạm thời (Chưa kết nối Cloudinary)'
    };
  }
}

// ==========================================
// SYSTEM STATUS
// ==========================================
export async function fetchApiStatus() {
  try {
    const res = await fetch(`${API_BASE}/status`);
    if (!res.ok) throw new Error('API server không phản hồi');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      dbConnected: false,
      uriConfigured: false,
      cloudinaryConfigured: false,
      error: 'Không thể kết nối tới Server Backend (Port 5001). Đang chạy bằng dữ liệu nội bộ React.',
      productCount: localFallbackProducts.length,
      storageType: 'Trình duyệt (Offline Fallback)'
    };
  }
}

// ==========================================
// PRODUCT CRUD
// ==========================================
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Lỗi tải sản phẩm');
    const json = await res.json();
    return {
      data: json.data || [],
      source: json.source || 'server',
      isOffline: false
    };
  } catch (err) {
    console.warn('API backend chưa chạy, sử dụng dữ liệu dự phòng cục bộ:', err.message);
    return {
      data: localFallbackProducts,
      source: 'offline_fallback',
      isOffline: true
    };
  }
}

export async function fetchProductById(idOrCode) {
  try {
    const res = await fetch(`${API_BASE}/products/${idOrCode}`);
    if (!res.ok) throw new Error('Không tìm thấy sản phẩm');
    const json = await res.json();
    return { data: json.data, source: json.source, isOffline: false };
  } catch (err) {
    const found = localFallbackProducts.find(p => p._id === idOrCode || p.verificationCode === idOrCode);
    if (found) {
      return { data: found, source: 'offline_fallback', isOffline: true };
    }
    return { data: localFallbackProducts[0], source: 'offline_fallback', isOffline: true };
  }
}

export async function createProduct(productData) {
  let res;
  try {
    res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
  } catch (networkErr) {
    // Only fall back if backend server is completely unreachable / network error
    const newP = {
      ...productData,
      _id: `fallback_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    localFallbackProducts.unshift(newP);
    return {
      success: true,
      data: newP,
      message: 'Server backend chưa chạy, đã lưu tạm vào bộ nhớ trình duyệt.'
    };
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || json.message || 'Lỗi tạo sản phẩm trên Server');
  }
  return json;
}

export async function updateProduct(id, productData) {
  let res;
  try {
    res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
  } catch (networkErr) {
    const idx = localFallbackProducts.findIndex(p => p._id === id || p.verificationCode === id);
    if (idx !== -1) {
      localFallbackProducts[idx] = {
        ...localFallbackProducts[idx],
        ...productData,
        updatedAt: new Date().toISOString()
      };
      return { success: true, data: localFallbackProducts[idx], message: 'Đã cập nhật (Bộ nhớ tạm)!' };
    }
    throw networkErr;
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || json.message || 'Lỗi cập nhật sản phẩm');
  }
  return json;
}

export async function deleteProduct(id) {
  let res;
  try {
    res = await fetch(`${API_BASE}/products/${id}`, {
      method: 'DELETE'
    });
  } catch (networkErr) {
    const idx = localFallbackProducts.findIndex(p => p._id === id || p.verificationCode === id);
    if (idx !== -1) {
      localFallbackProducts.splice(idx, 1);
      return { success: true, message: 'Đã xoá sản phẩm (Bộ nhớ tạm)!' };
    }
    throw networkErr;
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json.error || json.message || 'Lỗi xoá sản phẩm');
  }
  return json;
}

export async function seedProducts() {
  try {
    const res = await fetch(`${API_BASE}/products/seed`, {
      method: 'POST'
    });
    return await res.json();
  } catch (err) {
    localFallbackProducts = JSON.parse(JSON.stringify(defaultSeedProducts)).map((p, idx) => ({
      ...p,
      _id: `fallback_${idx + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    return { success: true, message: 'Đã nạp lại dữ liệu mẫu (Bộ nhớ tạm)!' };
  }
}
