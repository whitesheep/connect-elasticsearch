# connect-memcached

  Elasticsearch session store, using [elasticsearch-js](https://github.com/elasticsearch/elasticsearch-js) for communication with db server.

## Installation

  via npm:

      $ npm install connect-elasticsearch

## Example
```javascript

    var express = require('express');
    var ElasticsearchStore = require('connect-elasticsearch')(express);

    var app = express();

    app.use(express.favicon());
    app.use(express.logger());
    app.use(express.cookieParser());

    app.use(express.session({
      secret: 's3333cr3t!',
      store: new ElasticsearchStore({
        hosts: [ '192.168.26.129:9200' ] // Change this to your memcache server(s). See Options for additional info.
      })
    }));

    app.get('/', function(req, res){
      if (req.session.views) {
        ++req.session.views;
      } else {
        req.session.views = 1;
      }
      res.send(req.session.views);
    });

    app.listen(3000);
```

## Options
- `hosts` Elasticsearch servers locations, can by string, array, hash.
- `prefix` An optional prefix for each key;


## License

Copyright (C) 2014 Marco Rondini

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
