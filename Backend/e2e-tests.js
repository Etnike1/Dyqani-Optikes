const BASE = 'http://localhost:8080';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {};
  if (body) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch (err) {
    data = text;
  }

  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
    data,
    headers: Object.fromEntries(res.headers.entries()),
  };
}

async function login(username, password) {
  return await request('/api/auth/login', {
    method: 'POST',
    body: { username, password },
  });
}

async function refresh(refreshToken) {
  return await request('/api/auth/refresh', {
    method: 'POST',
    body: { refreshToken },
  });
}

async function logout(refreshToken) {
  return await request('/api/auth/logout', {
    method: 'POST',
    body: { refreshToken },
  });
}

async function getUsers(token) {
  return await request('/api/users', { token });
}

async function createUser(token, username, email, password) {
  return await request('/api/users', {
    method: 'POST',
    token,
    body: { username, email, password },
  });
}

async function run() {
  const accounts = [
    { role: 'ADMIN', username: 'admin', password: 'Admin123!' },
    { role: 'EMPLOYEE', username: 'employee', password: 'Employee123!' },
    { role: 'CLIENT', username: 'client', password: 'Client123!' },
  ];

  for (const account of accounts) {
    const result = await login(account.username, account.password);
    console.log(`LOGIN ${account.role}: ${account.username}:${account.password} => ${result.status}`);
    if (!result.ok) {
      console.error('LOGIN FAILED', result.data);
      continue;
    }
    console.log('  token role', result.data.role);
    if (result.data.role !== `ROLE_${account.role}`) {
      console.error('  role mismatch', result.data.role);
    }

    if (account.role === 'ADMIN') {
      const usersResp = await getUsers(result.data.token);
      console.log('  GET /api/users status', usersResp.status);
      if (usersResp.ok) {
        console.log('  users count', Array.isArray(usersResp.data) ? usersResp.data.length : 'N/A');
      } else {
        console.error('  get users failed', usersResp.data);
      }

      const newUser = `autotest_user_${Date.now()}`;
      const createResp = await createUser(result.data.token, newUser, `${newUser}@example.com`, 'Pass1234!');
      console.log('  CREATE /api/users status', createResp.status);
      if (!createResp.ok) {
        console.error('  create user failed', createResp.data);
      }
    }

    if (account.role === 'EMPLOYEE') {
      const usersResp = await getUsers(result.data.token);
      console.log('  GET /api/users status', usersResp.status);
      if (!usersResp.ok) {
        console.error('  employee cannot list users:', usersResp.status, usersResp.data);
      }
      const createResp = await createUser(result.data.token, `emp_dummy_${Date.now()}`, `emp_dummy_${Date.now()}@example.com`, 'Pass1234!');
      console.log('  EMPLOYEE CREATE /api/users status', createResp.status);
      if (createResp.ok) {
        console.error('  employee should not be able to create users but did');
      }
    }

    if (account.role === 'CLIENT') {
      const usersResp = await getUsers(result.data.token);
      console.log('  GET /api/users status', usersResp.status);
      if (usersResp.ok) {
        console.error('  client should not get users, but got list');
      }
    }

    const refreshResp = await refresh(result.data.refreshToken);
    console.log('  REFRESH status', refreshResp.status);
    if (!refreshResp.ok) {
      console.error('  refresh failed', refreshResp.data);
    }

    const logoutResp = await logout(result.data.refreshToken);
    console.log('  LOGOUT status', logoutResp.status);
    if (!logoutResp.ok) {
      console.error('  logout failed', logoutResp.data);
    }

    const refreshAfterLogout = await refresh(result.data.refreshToken);
    console.log('  REFRESH AFTER LOGOUT status', refreshAfterLogout.status);
    if (refreshAfterLogout.ok) {
      console.error('  refresh should fail after logout but succeeded');
    }
  }
}

run().catch((err) => {
  console.error('ERROR', err);
  process.exit(1);
});
