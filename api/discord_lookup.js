import axios from 'axios';

export default async function handler(res) {
  const userId = 926549832527667210;
  const apiKey = process.env.RAPIDAPI_KEY;

  if (!userId) {
    return res.status(400).json({ error: 'Falta el parámetro id' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta la clave API en variables de entorno' });
  }

  try {
    const response = await axios.get(`https://discord-lookup.p.rapidapi.com/users/${userId}`, {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'discord-lookup.p.rapidapi.com',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error en la API externa:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error al obtener datos de Discord Lookup' });
  }
}
