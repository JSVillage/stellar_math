exports.handlebars = {
    compare: function(v1, options) {
        if (options.hash.to  != undefined && v1 == options.hash.to)  return options.fn(this); // {{compare v1 to=v2}}  return v1 == v2
        if (options.hash.not != undefined && v1 != options.hash.not) return options.fn(this); // {{compare v1 not=v2}} return v1 != v2
        if (options.hash.gt  != undefined && v1  > options.hash.gt)  return options.fn(this); // {{compare v1 gt=v2}}  return v1  > v2
        if (options.hash.gte != undefined && v1 >= options.hash.gte) return options.fn(this); // {{compare v1 gte=v2}} return v1 >= v2
        if (options.hash.lt  != undefined && v1  < options.hash.lt)  return options.fn(this); // {{compare v1 lt=v2}}  return v1  < v2
        if (options.hash.lte != undefined && v1 <= options.hash.lte) return options.fn(this); // {{compare v1 lte=v2}} return v1 <= v2
        return options.inverse(this);
    }
};