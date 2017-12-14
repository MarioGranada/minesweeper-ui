<template lang='jade'>
  .bg-color-light.tablet-padding
    .col-md-base.center-container
      .p-xs.padded-container.mt-s.row.center-sm.center-xs
        .row.mb-xs.col-sm-12.col-xs-12
          | name
          {{userData.name}}
        .row.mb-xs.col-sm-12.col-xs-12
          | Email
          {{userData.email}}
        .row.mb-xs.col-sm-12.col-xs-12
          button(@click = 'loadGames()') Load Games
        .row.mb-xs.col-sm-12.col-xs-12
          button(@click = 'togleNewGameForm()') New Game
        .row.mb-xs.col-xs-12
          game-form(:user-id = 'userData._id.$oid'
            v-if= 'newGame')
        .row.mb-xs.col-sm-12.col-xs-12
          button(@click = 'togleNewGameForm()' v-if= 'newGame') Close New Game form
        .row.col-xs-12
          .col-xs-3(v-for = 'game in games')
            .col-xs-12
              | Rows
              {{game.rows}}
            .col-xs-12
              | Columns
              {{game.cols}}
            .col-xs-12
              | Number of mines
              {{game.mines_total}}
            .col-xs-12
              | Status
              {{gameStatus(game.grid_status)}}
            .col-xs-12
              | Time
              {{formatTime(game.time)}}
            .col-xs-12
              button(@click = 'resumeGame(game)') Start/Resume Game
        .row.col-xs-12.col-sm-12
          .col-xs-12.text-center.main-color-text.mv-s.fs-12.underline.my-account-log-out-link
            span(@click='logOut()') Log out
</template>

<script>
  import request from 'superagent';
  import Base from '../services/base';
  import moment from 'moment';
  import GameForm from '../components/game-form/GameForm.vue';

  const data = function(){
    return {
      userData: {},
      games: [],
      newGame: false,
    }
  }

  const methods = {
    logOut() {
      this.$router.push({path: '/'});
    },
    loadGames() {
      request
      .get(Base.BASE_ENDPOINTS + '/users/' + this.userData._id.$oid + '/games/')
      .end((err, res) => {
        this.games = res.body.reverse();
      });
    },
    setData(err, user) {
      if (err) {
        this.error = err.toString();
      } else {
        this.userData = user;
      }
    },
    resumeGame(game) {
      this.$router.push({path: '/my-account/games/' + game._id.$oid});
    },
    formatTime(time) {
      return moment(time).format("mm:ss");
    },
    gameStatus(gameStatus) {
      var status;
      switch(gameStatus) {
        case 'FINISHED': 
          status = 'Game Completed';
          break;
        case 'OVER':
          status = 'Game Over';
          break;
        default:
          status = 'In Game';
      }
      return status;
    },
    togleNewGameForm(){
      this.newGame = !this.newGame;
    }
  }

  export default {
    components: {
      GameForm
    },
    data,
    methods,
    beforeRouteEnter (to, from, next) {
      request
      .get(Base.BASE_ENDPOINTS + '/users/' + to.params.id)
      .end((err, res) => {
        next(vm => vm.setData(err, res.body));
      });
    }
  }
</script>
