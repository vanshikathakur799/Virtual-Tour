AFRAME.registerComponent('thumbnail', {
    schema: {
        state: {type: 'string', default: 'places-list'},
        selected_card: {type: 'string', default: '#card1'}
    },

    init: function(){
        this.places_container = this.el
        this.createCards()
    },

    tick: function() {
        const {state} = this.el.getAttribute('thumbnail')
        if (state === 'view') {
            this.hide_el([this.places_container])
            this.show_el() 
        }
    },

    hide_el: function(el_list) {
        el_list.map((item) => {
            item.setAttribute('visible', false)
        })
    },

    show_el: function() {
        const {selected_card} = this.data
        var sky_el = document.querySelector('#main_container')
        sky_el.setAttribute('material', {src: `assets/360_images/${selected_card}/place-0.jpg`, color: 'white'})
    },

    createCards: function() {
        var thumbnail_ref = [
            {id: 'tajmahal', title: 'Taj Mahal', url: './assets/taj_mahal.png'},
            {id: 'budapest', title: 'Budapest', url: './assets/budapest.jpg'},
            {id: 'eiffeltower', title: 'Eiffel Tower', url: './assets/eiffel_tower.jpg'},
            {id: 'newyork', title: 'New York City', url: './assets/new_york_city.png'}
        ]

        var position_x = -60
        for (var item of thumbnail_ref){
            var pos_x = position_x + 25
            position_x = pos_x 
            var pos_y = 10
            var pos_z = -40
            
            var position = {x: pos_x, y: pos_y, z: pos_z}

            var border_el = this.createBorder(position, item.id)

            var thumbnail_el = this.createThumbnail(item)
            border_el.appendChild(thumbnail_el)
        
            var title_el = this.createTitle(position, item)
            border_el.appendChild(title_el)

            this.places_container.appendChild(border_el) 
            
        }
    },

    createBorder: function(position, id) {
        var entity_el = document.createElement('a-entity')
        entity_el.setAttribute('id', id)
        entity_el.setAttribute('position', position)
        entity_el.setAttribute('visible', true)
        entity_el.setAttribute('geometry', {primitive: 'ring', radiusInner: 9, radiusOuter: 10})
        entity_el.setAttribute('material', {color: 'black', opacity: 0.5})
        entity_el.setAttribute('cursor-listener', {})
        return entity_el
    },

    createThumbnail: function(item) {
        var entity_el = document.createElement('a-entity')
        entity_el.setAttribute('visible', true)
        entity_el.setAttribute('geometry', {primitive: 'circle', radius: 9})
        entity_el.setAttribute('material', {src: item.url})
        return entity_el
    },

    createTitle: function(position, item){
        var entity_el = document.createElement('a-entity')
        entity_el.setAttribute('text', {font: 'exo2bold', align: 'center', width: 70, color: 'black', value: item.title})
        var el_position = position
        el_position.y = -20
        entity_el.setAttribute('position', el_position)
        entity_el.setAttribute('visible', true)
        return entity_el
    }
})