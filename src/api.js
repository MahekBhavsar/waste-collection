const API_BASE = "/api"; 

export const getAddresses = async (postcode) => {
  const res = await fetch(`${API_BASE}/address`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postcode })
  });
  return res.json();
};

export const getCollections = async (uprn) => {
  const res = await fetch(`${API_BASE}/collection`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uprn })
  });
  return res.json();
};