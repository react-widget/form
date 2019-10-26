
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyValue = isEmptyValue;
exports.deferred = deferred;

function isEmptyValue(value) {
  if (value === undefined || value === null) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (typeof value === "string" && !value) {
    return true;
  }

  return false;
}

function deferred() {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}