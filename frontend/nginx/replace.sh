#! /usr/bin/env sh

for i in `env | grep '^VITE_'`
do
    key=$(echo "$i" | cut -d"=" -f1);
    val=$(echo "$i" | cut -d"=" -f2);

    sed -i -e "s+${key}+${val}+g"  /usr/share/nginx/html/assets/*.js;
done