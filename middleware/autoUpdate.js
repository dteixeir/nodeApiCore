var ObjectID = require('mongodb').ObjectID;

module.exports = {
  autoUpdate: (req, res, next) => {
    try {
      switch (req.originalMethod) {
        case 'POST':
          req.body = {
            ...req.body,
            CreatedBy: new ObjectID(req.user._id),
            UpdatedBy: new ObjectID(req.user._id)
          };
          break;

        case 'PUT':
          req.body = {
            ...req.body,
            UpdatedBy: new ObjectID(req.user._id)
          };
          break;
      }

      return req;

    } catch (err) {
      throw { Message: err, File: __filename };
    }
  }
}
