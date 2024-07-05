const axios = require('axios');
const ngrok = require('ngrok');

const vercelToken = 'Kwmo32zAdWSS3n0OE8phUNyh'; // Replace with your Vercel API token
const projectId = 'prj_Ia6oWDFU3nHac56E9irozDjZ50XF'; // Replace with your Vercel project ID

const updateVercelEnv = async (newUrl) => {
  try {
    // Fetch environment variables
    const response = await axios.get(`https://api.vercel.com/v9/projects/${projectId}/env`, {
      headers: {
        Authorization: `Bearer ${vercelToken}`,
      },
    });

    // Find the environment variable with key 'NEXT_PUBLIC_API_BASE_URL'
    const targetEnvVar = response.data['envs'][0];

    if (!targetEnvVar) {
      throw new Error('Environment variable NEXT_PUBLIC_API_BASE_URL not found');
    }

    // Update the value with the new URL
    const updateResponse = await axios.patch(
      `https://api.vercel.com/v9/projects/${projectId}/env/${targetEnvVar.id}`,
      {
        value: newUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${vercelToken}`,
        },
      }
    );

    console.log('Environment variable updated successfully:', updateResponse.data);
  } catch (error) {
    console.error('Error updating Vercel environment variable:', error.response ? error.response.data : error.message);
  }
};

const startNgrok = async () => {
  try {
    const url = await ngrok.connect({
      addr: 8000,
      proto: 'http'
    });
    console.log(`ngrok URL: ${url}`);
    await updateVercelEnv(url);
  } catch (error) {
    console.error('Error starting ngrok:', error.message);
  }
};

startNgrok();


