const axios = require('axios');
const ngrok = require('ngrok');

const updateVercelEnv = async (newUrl) => {
  const vercelToken = 'your-vercel-api-token'; // Replace with your Vercel API token
  const projectId = 'your-vercel-project-id'; // Replace with your Vercel project ID

  try {
    const response = await axios.patch(
      `https://api.vercel.com/v9/projects/${projectId}/env`,
      {
        key: 'NEXT_PUBLIC_API_BASE_URL',
        value: newUrl,
        target: ['development'],
        type: 'plain'
      },
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error('Error updating Vercel environment variable:', error.response ? error.response.data : error.message);
  }
};

const startNgrok = async () => {
  try {
    const url = await ngrok.connect(8000);
    console.log(`ngrok URL: ${url}`);
    await updateVercelEnv(url);
  } catch (error) {
    console.error('Error starting ngrok:', error.message);
  }
};

startNgrok();
