var app = new Vue({
  el: '#app',
  data: {
    loading: true,
    status: {
      prophecy: 'loading...',
      accessory: 'loading...',
      armour: 'loading...',
      weapon: 'loading...',
    },
    destinyList: [
      {
        prophecy: {
          zh: ``,
          us: ``,
          price: ``,
        },
        item: {
          zh: ``,
          us: ``,
          price: ``,
        },
        upgrades: {
          zh: ``,
          us: ``,
          price: ``,
        },
      },
    ],
  },
  methods: {
    strip(num, precision = 12) {
      return +parseFloat(num.toPrecision(precision))
    },
    async myFetch(type) {
      // type ['Prophecy', 'UniqueAccessory', 'UniqueArmour']
      // Prophecy
      let get = localStorage.getItem(type)
      if (!!get) {
        return JSON.parse(get)
      } else {
        return await fetch('https://cors.bridged.cc/https://poe.ninja/api/data/itemoverview?league=Expedition&language=en&type=' + type)
          .then((response) => response.json())
          .then((jsonData) => {
            localStorage.setItem(type, JSON.stringify(jsonData))
            return jsonData
          })
      }
    },
    tradeLink(name) {
      return `https://www.pathofexile.com/trade/search/Expedition?q={"query":{"name":"${name}"}}`
    },
    trade6LLink(name) {
      return `https://www.pathofexile.com/trade/search/Expedition?q={"query":{"filters":{"socket_filters":{"filters":{"links":{"min":6}}}},"name":"${name}"}}`
    },
    loadData(clearData = false) {
      this.loading = true
      if (clearData) {
        localStorage.clear()
      }
      // load local data
      fetch('json/destiny.json')
        .then((response) => response.json())
        .then(async (destinyList) => {
          this.status.prophecy = 'loading...'
          this.status.accessory = 'loading...'
          this.status.armour = 'loading...'
          this.status.weapon = 'loading...'
          let Prophecy = (await this.myFetch('Prophecy')).lines
          this.status.prophecy = 'done'
          let UniqueAccessory = (await this.myFetch('UniqueAccessory')).lines
          this.status.accessory = 'done'
          let UniqueArmour = (await this.myFetch('UniqueArmour')).lines
          this.status.armour = 'done'
          let UniqueWeapon = (await this.myFetch('UniqueWeapon')).lines
          this.status.weapon = 'done'
          destinyList.forEach((destiny) => {
            // add link
            destiny.prophecy.link = this.tradeLink(destiny.prophecy.us)
            destiny.item.link = this.tradeLink(destiny.item.us)
            destiny.upgrades.link = this.tradeLink(destiny.upgrades.us)
            // Prophecy
            // console.log('[ Prophecy ]')
            let prophecy = Prophecy.find(({ name }) => name === destiny.prophecy.us)
            if (!!prophecy) {
              prophecy.lowConfidenceSparkline = prophecy.lowConfidenceSparkline || {}
              destiny.prophecy.price = prophecy.chaosValue
              destiny.prophecy.increase = prophecy.lowConfidenceSparkline.totalChange
            }
            // console.log(destiny.prophecy.zh, destiny.prophecy.increase)
            // UniqueAccessory
            // console.log('[ UniqueAccessory ]')
            let UAccessory_item = UniqueAccessory.find(({ name }) => name === destiny.item.us)
            if (!!UAccessory_item) {
              //   console.log('UniqueAccessory', destiny.item.zh, UAccessory_item)
              UAccessory_item.lowConfidenceSparkline = UAccessory_item.lowConfidenceSparkline || {}
              destiny.item.price = UAccessory_item.chaosValue
              destiny.item.increase = UAccessory_item.lowConfidenceSparkline.totalChange
            }
            let UAccessory_upgrades = UniqueAccessory.find(({ name }) => name === destiny.upgrades.us)
            if (!!UAccessory_upgrades) {
              UAccessory_upgrades.lowConfidenceSparkline = UAccessory_upgrades.lowConfidenceSparkline || {}
              destiny.upgrades.price = UAccessory_upgrades.chaosValue
              destiny.upgrades.increase = UAccessory_upgrades.lowConfidenceSparkline.totalChange
            }
            // UniqueArmour
            // console.log('[ UniqueArmour ]', destiny.item.zh, destiny.item.us)
            let UArmour_item = UniqueArmour.find(({ name, links }) => name === destiny.item.us)
            if (!!UArmour_item) {
              UArmour_item.links = UArmour_item.links || 0
            }
            if (!!UArmour_item && UArmour_item.links == 0) {
              //   console.log('UArmour_item', destiny.item.zh, UniqueArmour)
              UArmour_item.lowConfidenceSparkline = UArmour_item.lowConfidenceSparkline || {}
              destiny.item.price = UArmour_item.chaosValue
              destiny.item.increase = UArmour_item.lowConfidenceSparkline.totalChange
            }
            let UArmour_upgrades = UniqueArmour.find(({ name, links }) => name === destiny.upgrades.us)
            if (!!UArmour_upgrades) {
              UArmour_upgrades.links = UArmour_upgrades.links || 0
            }
            if (!!UArmour_upgrades && UArmour_upgrades.links == 0) {
              //   console.log('UArmour_upgrades', destiny.item.zh, UniqueArmour)
              UArmour_upgrades.lowConfidenceSparkline = UArmour_upgrades.lowConfidenceSparkline || {}
              destiny.upgrades.price = UArmour_upgrades.chaosValue
              destiny.upgrades.increase = UArmour_upgrades.lowConfidenceSparkline.totalChange
            }
            // UniqueWeapon
            // console.log('[ UniqueWeapon ]')
            let UW_item = UniqueWeapon.find(({ name, links }) => name === destiny.item.us)
            if (!!UW_item) {
              UW_item.links = UW_item.links || 0
            }
            if (!!UW_item && UW_item.links == 0) {
              UW_item.lowConfidenceSparkline = UW_item.lowConfidenceSparkline || {}
              destiny.item.price = UW_item.chaosValue
              destiny.item.increase = UW_item.lowConfidenceSparkline.totalChange
            }
            let UW_upgrades = UniqueWeapon.find(({ name, links }) => name === destiny.upgrades.us)
            if (!!UW_upgrades) {
              UW_upgrades.links = UW_upgrades.links || 0
            }
            if (!!UW_upgrades && UW_upgrades.links == 0) {
              UW_upgrades.lowConfidenceSparkline = UW_upgrades.lowConfidenceSparkline || {}
              destiny.upgrades.price = UW_upgrades.chaosValue
              destiny.upgrades.increase = UW_upgrades.lowConfidenceSparkline.totalChange
            }
            // 6L
            let UArmour6L_item = UniqueArmour.find(({ name, links }) => name === destiny.item.us && links === 6)
            let UArmour6L_upgrades = UniqueArmour.find(({ name, links }) => name === destiny.upgrades.us && links === 6)
            let UW6L_item = UniqueWeapon.find(({ name, links }) => name === destiny.item.us && links === 6)
            let UW6L_upgrades = UniqueWeapon.find(({ name, links }) => name === destiny.upgrades.us && links === 6)
            // console.log('UArmour6L_item', UArmour6L_item)
            // console.log('UArmour6L_upgrades', UArmour6L_upgrades)
            if (!!UArmour6L_item && !!UArmour6L_upgrades) {
              destinyList.push({
                prophecy: {
                  zh: destiny.prophecy.zh,
                  us: destiny.prophecy.us,
                  price: destiny.prophecy.price,
                  link: this.tradeLink(destiny.prophecy.us),
                  increase: destiny.prophecy.increase,
                },
                item: {
                  zh: destiny.item.zh + '[6L]',
                  us: destiny.item.us,
                  price: UArmour6L_item.chaosValue,
                  link: this.trade6LLink(destiny.item.us),
                  increase: UArmour6L_item.lowConfidenceSparkline.totalChange,
                },
                upgrades: {
                  zh: destiny.upgrades.zh + '[6L]',
                  us: destiny.upgrades.us,
                  price: UArmour6L_upgrades.chaosValue,
                  link: this.trade6LLink(destiny.upgrades.us),
                  increase: UArmour6L_upgrades.lowConfidenceSparkline.totalChange,
                },
                profit: this.strip(UArmour6L_upgrades.chaosValue - UArmour6L_item.chaosValue - destiny.prophecy.price),
              })
            }
            if (!!UW6L_item || !!UW6L_upgrades) {
              UW6L_item = UW6L_item || {}
              UW6L_upgrades = UW6L_upgrades || { lowConfidenceSparkline: {} }
              UW6L_item.lowConfidenceSparkline = UW6L_item.lowConfidenceSparkline || {}
              UW6L_upgrades.lowConfidenceSparkline = UW6L_upgrades.lowConfidenceSparkline || {}
              //   console.log('price: UW6L_upgrades', UW6L_upgrades)
              destinyList.push({
                prophecy: {
                  zh: destiny.prophecy.zh,
                  us: destiny.prophecy.us,
                  price: destiny.prophecy.price,
                  link: this.tradeLink(destiny.prophecy.us),
                  increase: destiny.prophecy.increase,
                },
                item: {
                  zh: destiny.item.zh + '[6L]',
                  us: destiny.item.us,
                  price: UW6L_item.chaosValue,
                  link: this.trade6LLink(destiny.item.us),
                  increase: UW6L_item.lowConfidenceSparkline.totalChange,
                },
                upgrades: {
                  zh: destiny.upgrades.zh + '[6L]',
                  us: destiny.upgrades.us,
                  price: UW6L_upgrades.chaosValue,
                  link: this.trade6LLink(destiny.upgrades.us),
                  increase: UW6L_upgrades.lowConfidenceSparkline.totalChange,
                },
                profit: this.strip(UW6L_upgrades.chaosValue - UW6L_item.chaosValue - destiny.prophecy.price),
              })
            }
            // 6L
            // let UW6L_upgrades = UniqueWeapon.find(({ name, links }) => name === destiny.upgrades.us && links === 6)
            // if (!!UW6L_upgrades) {
            //   let newName = destiny.upgrades.zh + '[6L]'
            //   console.log('newName', newName)
            //   let check6LItem = destinyList.find(({ upgrades }) => upgrades.zh === newName)
            //   if (!!check6LItem) {
            //     console.log('check6LItem', !!check6LItem, destinyList.length, newName)
            //     check6LItem.upgrades.price = UW6L_upgrades.chaosValue
            //   } else {
            //     console.log('check6LItem', !!check6LItem, destinyList.length, newName)
            //     destinyList.push({
            //       prophecy: {
            //         zh: destiny.prophecy.zh,
            //         us: destiny.prophecy.us,
            //         price: destiny.prophecy.price
            //       },
            //       item: {
            //         zh: destiny.item.zh + '[6L]',
            //         us: destiny.item.us,
            //         price: destiny.item.chaosValue
            //       },
            //       upgrades: {
            //         zh: destiny.upgrades.zh + '[6L]',
            //         us: destiny.upgrades.us,
            //         price: UW6L_upgrades.chaosValue
            //       }
            //     })
            //   }
            // }
            // strip
            destiny.profit = this.strip(destiny.upgrades.price - destiny.item.price - destiny.prophecy.price)
          })
          destinyList.sort((a, b) => {
            let aa = a.profit || 0
            let bb = b.profit || 0
            return bb - aa
          })
          this.destinyList = destinyList
          this.loading = false
        })
    },
  },
  async mounted() {
    console.log('mounted')
    this.loadData()
    // get ?????? price

    // fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=Prophecy&language=en')
    //   .then(response => response.json())
    //   .then(jsonData => {
    //     let lines = jsonData.lines;
    //     this.destinyList.forEach(destiny => {
    //       let prophecy = lines.find(({ name }) => name === destiny.prophecy.us)
    //       destiny.prophecy.price = prophecy.chaosValue
    //     })
    //   });
    // get ?????? price
    // fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueAccessory&language=en')
    //   .then(response => response.json())
    //   .then(jsonData => {
    //     let lines = jsonData.lines;
    //     this.destinyList.forEach(destiny => {
    //       let item = lines.find(({ name }) => name === destiny.item.us)
    //       if (!!item) {
    //         destiny.item.price = item.chaosValue
    //       }
    //       let upgrades = lines.find(({ name }) => name === destiny.upgrades.us)
    //       if (!!upgrades) {
    //         destiny.upgrades.price = upgrades.chaosValue
    //       }
    //     })
    //   });
    // get ?????? price
    // fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueArmour&language=en')
    //   .then(response => response.json())
    //   .then(jsonData => {
    //     let lines = jsonData.lines;
    //     this.destinyList.forEach(destiny => {
    //       let item = lines.find(({ name }) => name === destiny.item.us)
    //       if (!!item) {
    //         destiny.item.price = item.chaosValue
    //       }
    //       let upgrades = lines.find(({ name }) => name === destiny.upgrades.us)
    //       if (!!upgrades) {
    //         destiny.upgrades.price = upgrades.chaosValue
    //       }
    //     })
    //   });
    // get ?????? price
    // fetch('https://poe.ninja/api/data/itemoverview?league=Metamorph&type=UniqueWeapon&language=en')
    //   .then(response => response.json())
    //   .then(jsonData => {
    //     console.log('jsonData', jsonData);
    //     let lines = jsonData.lines;
    //     this.destinyList.forEach(destiny => {
    //       let item = lines.find(({ name }) => name === destiny.item.us)
    //       if (!!item) {
    //         destiny.item.price = item.chaosValue
    //       }
    //       let upgrades = lines.find(({ name }) => name === destiny.upgrades.us)
    //       if (!!upgrades) {
    //         destiny.upgrades.price = upgrades.chaosValue
    //       }
    //     })
    //   });
    // strip
  },
})
