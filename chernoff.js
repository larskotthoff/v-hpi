function sign(num) {
    if(num > 0) {
        return 1;
    } else if(num < 0) {
        return -1;
    } else {
        return 0;
    }
}

function d3_chernoff() {
    function nil() {
        return 0;
    }

    var facef = nil, // 0 - 1
        hairf = nil, // -1 - 1
        mouthf = nil, // -1 - 1
        nosehf = nil, // 0 - 1
        nosewf = nil, // 0 - 1
        eyehf = nil, // 0 - 1
        eyewf = nil, // 0 - 1
        browf = nil, // -1 - 1

        line = d3.svg.line()
            .interpolate("cardinal-closed")
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; }),
        bline = d3.svg.line()
            .interpolate("basis-closed")
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

    function chernoff(a) {
        if(a instanceof Array) {
            a.each(__chernoff);
        } else {
            d3.select(this).each(__chernoff);
        }
    }

    function __chernoff(d) {
        var ele = d3.select(this),
            facevar = facef(d) * 30,
            hairvar = hairf(d) * 80,
            mouthvar = mouthf(d) * 7,
            nosehvar = nosehf(d) * 10,
            nosewvar = nosewf(d) * 10,
            eyehvar = eyehf(d) * 10,
            eyewvar = eyewf(d) * 10,
            browvar = browf(d) * 3;

        var face = [{x: 70, y: 60}, {x: 120, y: 80},
                    {x: 120-facevar, y: 110}, {x: 120-facevar, y: 160},
                    {x: 20+facevar, y: 160}, {x: 20+facevar, y: 110},
                    {x: 20, y: 80}];
        ele.selectAll("path.face").data([face]).enter()
            .append("svg:path")
            .attr("class", "face")
            .attr("d", bline);

        var hair = [{x: 70, y: 60}, {x: 120, y: 80},
                    {x: 140, y: 45-hairvar}, {x: 120, y: 45},
                    {x: 70, y: 30}, {x: 20, y: 45},
                    {x: 0, y: 45-hairvar}, {x: 20, y: 80}];
        ele.selectAll("path.hair").data([hair]).enter()
            .append("svg:path")
            .attr("class", "hair")
            .attr("d", bline);

        var mouth = [{x: 70, y: 130+mouthvar},
                     {x: 110-facevar, y: 135-mouthvar},
                     {x: 70, y: 140+mouthvar},
                     {x: 30+facevar, y: 135-mouthvar}];
        ele.selectAll("path.mouth").data([mouth]).enter()
            .append("svg:path")
            .attr("class", "mouth")
            .attr("d", line);

        var nose = [{x: 70, y: 110-nosehvar},
                    {x: 70+nosewvar, y: 110+nosehvar},
                    {x: 70-nosewvar, y: 110+nosehvar}];
        ele.selectAll("path.nose").data([nose]).enter()
            .append("svg:path")
            .attr("class", "nose")
            .attr("d", line);

        var leye = [{x: 55, y: 90-eyehvar}, {x: 55+eyewvar, y: 90},
                    {x: 55, y: 90+eyehvar}, {x: 55-eyewvar, y: 90}];
        var reye = [{x: 85, y: 90-eyehvar}, {x: 85+eyewvar, y: 90},
                    {x: 85, y: 90+eyehvar}, {x: 85-eyewvar, y: 90}];
        ele.selectAll("path.leye").data([leye]).enter()
            .append("svg:path")
            .attr("class", "leye")
            .attr("d", bline);
        ele.selectAll("path.reye").data([reye]).enter()
            .append("svg:path")
            .attr("class", "reye")
            .attr("d", bline);

        ele.append("svg:path")
            .attr("class", "lbrow")
            .attr("d", "M" + (55-eyewvar/1.7-sign(browvar)) + "," +
                       (87-eyehvar+browvar) + " " +
                       (55+eyewvar/1.7-sign(browvar)) + "," +
                       (87-eyehvar-browvar));
        ele.append("svg:path")
            .attr("class", "rbrow")
            .attr("d", "M" + (85-eyewvar/1.7+sign(browvar)) + "," +
                       (87-eyehvar-browvar) + " " +
                       (85+eyewvar/1.7+sign(browvar)) + "," +
                       (87-eyehvar+browvar));
    }

    chernoff.face = function(x) {
        if(!arguments.length) return facef;
        facef = x;
        return chernoff;
    };

    chernoff.hair = function(x) {
        if(!arguments.length) return hairf;
        hairf = x;
        return chernoff;
    };

    chernoff.mouth = function(x) {
        if(!arguments.length) return mouthf;
        mouthf = x;
        return chernoff;
    };

    chernoff.noseh = function(x) {
        if(!arguments.length) return nosehf;
        nosehf = x;
        return chernoff;
    };

    chernoff.nosew = function(x) {
        if(!arguments.length) return nosewf;
        nosewf = x;
        return chernoff;
    };

    chernoff.eyeh = function(x) {
        if(!arguments.length) return eyehf;
        eyehf = x;
        return chernoff;
    };

    chernoff.eyew = function(x) {
        if(!arguments.length) return eyewf;
        eyewf = x;
        return chernoff;
    };

    chernoff.brow = function(x) {
        if(!arguments.length) return browf;
        browf = x;
        return chernoff;
    };

    return chernoff;
}

d3.chernoff = function() {
    return d3_chernoff(Object);
};
