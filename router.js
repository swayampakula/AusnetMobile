var router = require('express').Router();

router.use('/Job', require('./api/Job/Job.router'));
console.log('request reached here');

router.use('/Employee', require('./api/Employee/Employee.router'));
console.log('Employee request reached here');

// router.use('/appJob', require('./api/Job/Job.router'));

exports = module.exports = router;
