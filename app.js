<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style>
        body {
            background: #343a40;
        }
        [v-cloak] { display: none; }
        .prophecy>a {
            color: #b047fa;
        }

        .unique>a {
            color: #af6025;
        }

        .win {
            color: lightgreen;
        }

        .lose {
            color: red;
        }

        .float-right {
            text-align: right;
        }
    </style>
    <title>Buy low sell high</title>
</head>

<body>
    <div class="container" id="app" v-cloak>
        <div>
            <button type="button" class="btn btn-primary" v-on:click="loadData(true)" v-bind:disabled="loading">reload</button>
        </div>
        <table class="table table-hover table-bordered table-dark" v-show="loading">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">type</th>
                    <th scope="col">status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Prophecy</td>
                    <td>{{ status.prophecy }}</td>
                </tr>
                <tr>
                    <th scope="row">2</th>
                    <td>Unique Accessory</td>
                    <td>{{ status.accessory }}</td>
                </tr>
                <tr>
                    <th scope="row">3</th>
                    <td>Unique Armour</td>
                    <td>{{ status.armour }}</td>
                </tr>
                <tr>
                    <th scope="row">4</th>
                    <td>Unique Weapon</td>
                    <td>{{ status.weapon }}</td>
                </tr>
            </tbody>
        </table>
        <table class="table table-hover table-bordered table-dark" v-show="!loading">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">預言</th>
                    <th scope="col">物品</th>
                    <th scope="col">升級後</th>
                    <th scope="col">利潤</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(destiny, index) in destinyList">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                        <div class="float-left prophecy">
                            <a :href="destiny.prophecy.link">
                                {{ destiny.prophecy.zh }}<br />
                                {{ destiny.prophecy.us }}
                            </a>
                        </div>
                        <div class="float-right">
                            {{ destiny.prophecy.price }}<br />
                            <span :class="[destiny.prophecy.increase > 0 ? 'win' : 'lose']">
                                {{ destiny.prophecy.increase }}%
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="float-left unique">
                            <a :href="destiny.item.link">
                                {{ destiny.item.zh }}<br />
                                {{ destiny.item.us }}
                            </a>
                        </div>
                        <div class="float-right">
                            {{ destiny.item.price }}<br />
                            <span :class="[destiny.item.increase > 0 ? 'win' : 'lose']">
                                {{ destiny.item.increase }}%
                            </span>
                        </div>
                    </td>
                    <td>
                        <div class="float-left unique">
                            <a :href="destiny.upgrades.link">
                                {{ destiny.upgrades.zh }}<br />
                                {{ destiny.upgrades.us }}
                            </a>
                        </div>
                        <div class="float-right">
                            {{ destiny.upgrades.price }}<br />
                            <span :class="[destiny.upgrades.increase > 0 ? 'win' : 'lose']">
                                {{ destiny.upgrades.increase }}%
                            </span>
                        </div>
                    </td>
                    <td>
                        <div :class="[destiny.profit > 0 ? 'win' : 'lose']">{{ destiny.profit }}c</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
    <script src="app.js"></script>
</body>

</body>

</html>
