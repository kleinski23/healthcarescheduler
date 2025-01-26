interface AdminUser {
  email: string;
  password: string;
}

export const ADMIN_USER: AdminUser = {
  email: 'admin@mail.com',
  password: '123'
}

export const validateAdminCredentials = (email: string, password: string): boolean => {
  return email === ADMIN_USER.email && password === ADMIN_USER.password;
} 