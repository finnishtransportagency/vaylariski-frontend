import userInputDefault from "constants/UserInputDefault";
import { getDiff } from "recursive-diff";

const lastUsedParametersKey = "lastUsedParameters";
const savedParametersKey = "savedParameters";

const assign = (obj, prop, value) => {
  if (typeof prop === "string") {
    prop = prop.split(".");
  }
  if (prop.length > 1) {
    var e = prop.shift();
    assign(
      (obj[e] =
        Object.prototype.toString.call(obj[e]) === "[object Object]"
          ? obj[e]
          : {}),
      prop,
      value
    );
  } else obj[prop[0]] = value;
};

const del = (obj, prop) => {
  if (typeof prop === "string") {
    prop = prop.split(".");
  }
  if (prop.length > 1) {
    var e = prop.shift();
    del(
      (obj[e] =
        Object.prototype.toString.call(obj[e]) === "[object Object]"
          ? obj[e]
          : {}),
      prop
    );
  } else delete obj[prop[0]];
};

export const getLastUsedParameters = () => {
  const lastUsed = JSON.parse(
    window.localStorage.getItem(lastUsedParametersKey)
  );
  return reviseParameters(lastUsed);
};

export const setOneLastUsedParameter = (userInput, formikName, value) => {
  const currentValues = JSON.parse(JSON.stringify(userInput));
  assign(currentValues, formikName, value);
  window.localStorage.setItem(
    lastUsedParametersKey,
    JSON.stringify(currentValues)
  );
  return currentValues;
};

export const setAllLastUsedParameters = (params) => {
  window.localStorage.setItem(lastUsedParametersKey, JSON.stringify(params));
};

const getParameterTemplatesWithoutRevise = () => {
  const savesString = window.localStorage.getItem(savedParametersKey);
  const saves = savesString ? JSON.parse(savesString) : [];
  return saves;
};

export const getParameterTemplates = () => {
  const saves = getParameterTemplatesWithoutRevise();
  const revised = saves.map((s) => {
    return { ...s, parameters: reviseParameters(s.parameters) };
  });
  return revised;
};

export const saveParameterTemplate = (parameters, name) => {
  if (!parameters || !name) return;
  const template = {
    name,
    date: new Date().toISOString(),
    parameters,
  };
  const allSaves = getParameterTemplatesWithoutRevise().concat(template); // now we still keep "old" parameters e.g. in case of rollback.
  window.localStorage.setItem(savedParametersKey, JSON.stringify(allSaves));
  return allSaves;
};

/**
 * Checks and corrects if parameters are missing or there are extra parameters present.
 * @param {*} parameters
 * @returns a new corrected parameter object based on userInputDefault.js
 */
export const reviseParameters = (parameters) => {
  const correct = JSON.parse(JSON.stringify(parameters)); //deep copy, we don't modify the existing object, we return a correct one
  const d = getDiff(correct, userInputDefault);
  const deleted = d.filter((n) => n.op === "delete");
  const added = d.filter((n) => n.op === "add");

  if (deleted.length !== 0) {
    // template includes extra parameter(s)
    deleted.map((v) => {
      del(correct, v.path.join(".")); // delete each extra parameter
    });
  }
  if (added.length !== 0) {
    // template is missing parameter(s)
    added.map((v) => {
      assign(correct, v.path.join("."), v.val); // add the default value for each missing parameter
    });
  }
  return correct;
};
