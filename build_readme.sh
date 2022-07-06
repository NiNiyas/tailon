#!/bin/bash

go build
ed README.md <<< '/BEGIN HELP/+2,/END HELP/-2d\n/BEGIN HELP/+1r ./tailon --help 2>&1\n,w'
sed -i 's/[ \t]*$$//' README.md
