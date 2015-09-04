#!/bin/zsh

for i in ./ripped-json/*
do
    if test -f "$i"
    then
        TIMESTAMP=$(echo $i | grep -oe "[0-9]\+")
        BODY="{ \"timestamp\": $TIMESTAMP, \"countriesStats\": $(sed 's/\[object Object\]//g' $i) }" ;

        echo $BODY ;

        curl \
        -H "Content-Type: application/json" -X POST \
        -d "$BODY" http://workshape.coreos:11000/add/countries ;
    fi
done
