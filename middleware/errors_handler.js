module.exports = (error, req, res, next) => {
    const { title } = error;
    let { description } = error;

    const status = error.status || 500;
    if (status == 500) {
      description = 'Serveur cassé. Revenez plus tard.';
    }

    res.status(status).json({
      title,
      description,
    });
  };