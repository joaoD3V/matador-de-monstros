new Vue({
  el: '#app',
  data: {
    countToSpecialAttack: 0,
    countToHeal: 0,
    running: false,
    playerLife: 100,
    monsterLife: 100,
    logs: [],
    showSpecialAttack: false,
    showHeal: ''
  },
  computed: {
    hasResult() {
      return this.playerLife === 0 || this.monsterLife === 0
    }
  },
  methods: {
    startGame(){
      this.countToHeal = 0
      this.countToSpecialAttack = 0
      this.running = true
      this.playerLife = 100
      this.monsterLife = 100
      this.logs = [],
      this.showSpecialAttack = false,
      this.enableHeal = false
    },
    attack(special){
      this.countToAction()
      this.hurt('monsterLife', 5, 10, special, 'Jogador', 'Monstro', 'player')
      if(this.monsterLife > 0){
        this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
      }
    },
    hurt(prop, min, max, special, source, target, cls){
      let plus;
      if(this.countToSpecialAttack >= 4 && special === true){
        plus = 5 
        this.countToSpecialAttack = 0
      } else {
        plus = 0
      }
      const hurt = this.getRandom(min + plus, max + plus)
      this[prop] = Math.max(this[prop] - hurt, 0)
      if(special){
        this.registerLog(`${source} atingiu ${target} com ${hurt} em um ataque especial.`, cls)
      } else{
        this.registerLog(`${source} atingiu ${target} com ${hurt}.`, cls)
      }
    },
    getRandom(min, max){
      const value = Math.random() * (max - min) + min
      return Math.round(value)
    },
    heal(min, max){
      const heal = this.getRandom(min, max)
      this.playerLife = Math.min(this.playerLife + heal , 100)
      this.registerLog(`Jogador ganhou ${heal} de vida.`, 'player')
      this.countToHeal = 0
    },
    healAndHurt(){
      if(this.countToHeal >= 5){
        this.heal(10, 15)
        this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
      }
    },
    registerLog(text, cls){
      this.logs.unshift({text, cls})
    },
    countToAction(){
      this.countToSpecialAttack++
      this.countToHeal++
    },
  },
  watch: {
    hasResult(value){
      if(value) this.running = false
    },
    countToSpecialAttack(value){
      if(value >= 4){
        this.showSpecialAttack = true
      } else{
        this.showSpecialAttack = false
      }
    },
    countToHeal(value){
      if(value >= 5){
        this.showHeal = true
      } else{
        this.showHeal = false
      }
    },
  }
})