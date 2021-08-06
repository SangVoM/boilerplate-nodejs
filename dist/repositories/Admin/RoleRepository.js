'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RoleRepository = undefined;

var _Role = require('../../models/schema/Role');

var _Repository2 = require('../Repository');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleRepository = function (_Repository) {
    _inherits(RoleRepository, _Repository);

    function RoleRepository() {
        _classCallCheck(this, RoleRepository);

        return _possibleConstructorReturn(this, (RoleRepository.__proto__ || Object.getPrototypeOf(RoleRepository)).call(this, _Role.Role));
    }

    return RoleRepository;
}(_Repository2.Repository);

exports.RoleRepository = RoleRepository;