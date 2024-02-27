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

export const getLastUsedParameters = () => {
  return JSON.parse(window.localStorage.getItem(lastUsedParametersKey));
};

export const setOneLastUsedParameter = (userInput, formikName, value) => {
  const currentValues = userInput;
  assign(currentValues, formikName, value);
  window.localStorage.setItem(
    lastUsedParametersKey,
    JSON.stringify(currentValues)
  );
};

export const setAllLastUsedParameters = (params) => {
  window.localStorage.setItem(lastUsedParametersKey, JSON.stringify(params));
};

export const getParameterTemplates = () => {
  const savesString = window.localStorage.getItem(savedParametersKey);
  const saves = savesString ? JSON.parse(savesString) : [];
  return saves;
};

export const saveParameterTemplate = (parameters, name) => {
  if (!parameters || !name) return;
  const template = {
    name,
    date: new Date().toISOString(),
    parameters,
  };
  const allSaves = getParameterTemplates().concat(template);
  window.localStorage.setItem(savedParametersKey, JSON.stringify(allSaves));
  return allSaves;
};
