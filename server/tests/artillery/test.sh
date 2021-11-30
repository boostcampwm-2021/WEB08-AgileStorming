../../node_modules/artillery/bin/artillery run -o ./reports/api-stress.json api-stress.yml
../../node_modules/artillery/bin/artillery report ./reports/api-stress.json

# https://github.com/boostcampwm-2021/WEB08-AgileStorming/issues/193
# ../../node_modules/artillery/bin/artillery run -o ./reports/socket-stress.json socket-stress.yml
# ../../node_modules/artillery/bin/artillery report ./reports/socket-stress.json