import {isFunction} from './util';

class InjectAnnotation {
  constructor(...params) {
    this.params = params;
  }
}

class ProvideAnnotation {
  constructor(id) {
    this.id = id;
  }
}

// aliases
var Inject = InjectAnnotation;
var Provide = ProvideAnnotation;

// Helpers for when annotations are not enabled in Traceur.
function annotate(fn, annotation) {
  fn.annotations = fn.annotations || [];
  fn.annotations.push(annotation);
}


function getProvideAnnotation(provider) {
  if (!provider || !provider.annotations || !provider.annotations.length) {
    return null;
  }


  var annotations = provider.annotations;

  for (var annotation of annotations) {
    if (annotation instanceof ProvideAnnotation) {
      return annotation.id;
    }
  }

  return null;
}

function getInjectAnnotation(provider) {
  if (!provider || !provider.annotations || !provider.annotations.length) {
    return null;
  }

  var annotations = provider.annotations;
  for (var annotation of annotations) {
    if (annotation instanceof InjectAnnotation) {
      return annotation.params;
    }
  }

  return null;
}

function getInjectTokens(provider) {
  // Read the @Inject annotation on the class / function.
  var params = getInjectAnnotation(provider) || [];

  // Read the annotations on individual parameters.
  if (provider.parameters) {
    provider.parameters.forEach((param, idx) => {
      for (var paramAnnotation of param) {
        if (isFunction(paramAnnotation) && !params[idx]) {
          params[idx] = paramAnnotation;
        } else if (paramAnnotation instanceof Inject) {
          params[idx] = paramAnnotation.params[0];
          continue;
        }
      }
    });
  }

  return params;
}


export {
  annotate,
  Inject,
  InjectAnnotation,
  Provide,
  ProvideAnnotation,
  getInjectAnnotation,
  getProvideAnnotation,
  getInjectTokens
}
