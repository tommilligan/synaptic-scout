<template>
  <div class="hello">
    <div class="name-title">synaptic-scout | isoprene-pumpjack</div>
    <div class="credits">
      <div v-for="section in sections" :key="section.title" :class="section.className">
        <h4>{{section.title}}</h4>
        <ul>
          <li v-for="credit in section.credits">
            <a :href="credit.url" target="_blank">
              <img :src="credit.logo" class="logos" :alt="credit.alt">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      sections: [
        {
          title: 'displayed with',
          className: 'credits-js',
          credits: [
            {
              alt: 'VueJS',
              url: 'https://vuejs.org/',
              logo: require('../assets/logos/vue.svg')
            },
            {
              alt: 'D3',
              url: 'https://d3js.org/',
              logo: require('../assets/logos/d3.svg')
            },
            {
              alt: 'Webpack',
              url: 'https://webpack.js.org/',
              logo: require('../assets/logos/webpack.svg')
            }
          ]
        },
        {
          title: 'crunched with',
          className: 'credits-python',
          credits: [
            {
              alt: 'Python',
              url: 'https://www.python.org/',
              logo: require('../assets/logos/python.svg')
            },
            {
              alt: 'Flask',
              url: 'http://flask.pocoo.org/',
              logo: require('../assets/logos/flask.svg')
            }/** ,
            {
              alt: 'Redis',
              url: 'https://redis.io/',
              logo: require('../assets/logos/redis.svg')
            }**/
          ]
        },
        {
          title: 'stored with',
          className: 'credits-built',
          credits: [
            {
              alt: 'Neo4J',
              url: 'https://neo4j.com/',
              logo: require('../assets/logos/neo4j.svg')
            },
            {
              alt: 'Elasticsearch',
              url: 'https://www.elastic.co/',
              logo: require('../assets/logos/elasticsearch.svg')
            }
          ]
        },
        {
          title: 'built with',
          className: 'credits-built',
          credits: [
            {
              alt: 'GitHub',
              url: 'https://github.com/',
              logo: require('../assets/logos/github-icon-1.svg')
            },
            {
              alt: 'TravisCI',
              url: 'https://travis-ci.org/',
              logo: require('../assets/logos/travis-ci.svg')
            },
            {
              url: 'https://www.heroku.com/',
              logo: require('../assets/logos/heroku.svg')
            }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">

@import '~sass-variables';

.name-title {
  font-size: $font-giant;
  font-weight: normal;
  margin: $gutter-strip;
}

.credits {
  $logo-size: 48px;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
    height: $logo-size;
    width: $logo-size;
  }

    .logos {
    height: $logo-size;
  }
}

a {
  color: #42b983;
}
</style>
