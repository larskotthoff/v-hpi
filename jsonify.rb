#!/usr/bin/env ruby

require 'json'
require 'csv'

eur = JSON.parse(IO.read(ARGV[0]))

CSV.foreach(ARGV[1]) { |f|
    eur["features"].each { |c|
        if c["properties"]["name"] == f[2]
            c["properties"]["hpi"] = f[8].to_f
            c["properties"]["hly"] = f[7].to_f
            c["properties"]["gdppc"] = f[10].gsub(/,/, '').to_i
            c["properties"]["hdi"] = f[11].to_f
        end
    }
}

puts eur.to_json
#puts JSON.pretty_generate(eur)
