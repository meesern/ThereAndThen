#!/usr/bin/ruby -w

require 'rubygems'
require 'bundler/setup'
require 'xmpp4r-simple'
require 'hpricot'
require 'ruby/ocwitness'

Titanium.API.log("Starting Ruby Module")

def thereandthen_recover_data

  $ocw = OcWitness.new({ 
    :username => 'hatlocation',
    :password => 'jabber',
    :port   => appctl_getPort(),
    :type   => appctl_getReportType(),
    :server => appctl_getOcServer(),
    :ocname => appctl_getOcDest()
  })

  xmldata = $ocw.recover

  #parse the xml file
  doc = Hpricot(xmldata)

  Titanium.API.log("----Hpricot Loaded----")

  #collect all the 'trkpt' elements
#  $coords = doc.search("//trkpt").map do |tp|
#    #elevation is the contents of the 'ele' element
#    ele  = tp.at('ele').inner_html
#    #time is the contents of the 'time' element
#    time = tp.at('time').inner_html
#    #latitude is the contents of the 'lat' attribute
#    lat  = tp['lat']
#    #longitude is the contents of the 'lon' attribute
#    lon  = tp['lon'] 
#    {:lat=>lat, :lon=>lon, :ele=>ele, :time=>time}
  end

  Titanium.API.log("----Mapped Coords----")

  AppReport("Coords: #{$coords.length}")

  AppReport("Connect to WhatHappened")

  $length = $coords.length
  $ocw.flush
end



