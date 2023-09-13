AFRAME.registerComponent('side-view', {
    init: function() {
        this.createPlaces()
    },

    tick: function() {
        var placesContainer = document.querySelector('#places_container')
        var {state} = placesContainer.getAttribute('thumbnail')
        if (state === 'view' || state === 'changeView'){
            this.el.setAttribute('visible', true)
        }

        else{
            this.el.setAttribute('visible', false)
        }
    },
    createPlaceThumbnail: function(position, id){
        var entity_el = document.createElement('a-entity')
        entity_el.setAttribute('visible', true)
        entity_el.setAttribute('id', `place-${id}`) 
        entity_el.setAttribute('geometry', {primitive: 'circle', radius: 2.5})
        entity_el.setAttribute('material', {src: 'assets/helicopter.png', opacity: 0.7})
        entity_el.setAttribute('position', position) 
        entity_el.setAttribute('cursor-listener', {})
        return entity_el
    },

    createPlaces: function() {
        var sideView = document.querySelector('#sideView')
        var posX = -150
        var posY = 30
        
        for (var i = 1; i <= 4; i++){
            var position = {x: (posX += 50), y: (posY += 2), z: -40}
            var entity_el = this.createPlaceThumbnail(position, i) 
            sideView.appendChild(entity_el)
        }  
    }
})