export const createUser = (userData) => {
  return fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
};

export const createCardio = (cardioData, token) => {
  return fetch("/api/exercise/cardio", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardioData)
  })
}

export const createResistance = (resistanceData, token) => {
  return fetch("/api/exercise/cardio", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resistanceData)
  })
}