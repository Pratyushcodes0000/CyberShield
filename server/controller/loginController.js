const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.verifyGoogleToken = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); // Contains email, name, picture, etc.
    console.log(payload)

    // You can now store or return the user info
    res.status(200).json({
      message: 'Token verified',
      user: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
    });

  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};