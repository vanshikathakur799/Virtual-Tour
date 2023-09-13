AFRAME.registerComponent('cursor-listener', {
    schema:{
        selectedItem_id: {type: 'string', default: ''}
    },

    init: function() {
        this.handleMouseEnterEvent()
        this.handleMouseLeaveEvent()
        this.handelClickEvent()
    },

    handlePlacesList: function() {
        const id = this.el.getAttribute('id')
        const places_id = ['tajmahal', 'budapest', 'eiffeltower', 'newyork']
        if (places_id.includes(id)){
            const placesContainer = document.querySelector('#places_container')
            placesContainer.setAttribute('cursor-listener', {selectedItem_id: id})
            placesContainer.setAttribute('material', {color: 'red', opacity: 1})
            
        }
    },

    handleMouseEnterEvent: function() {
        this.el.addEventListener('mouseenter', () => {
            this.handlePlacesList()
        })
    },

    handleMouseLeaveEvent: function() {
        this.el.addEventListener('mouseleave', () => {
            const {selectedItem_id} = this.data
            if (selectedItem_id) {
                const el = document.querySelector(`#${selectedItem_id}`)
                const id = el.getAttribute('id')
                if (id == selectedItem_id){
                    el.setAttribute('material', {color: 'black', opacity: 0.7})
                }
            }
        })
    },

    handelClickEvent: function() {
        this.el.addEventListener('click', (e) => {
            var places_container = document.querySelector('#places_container')
            const {state} = places_container.getAttribute('thumbnail')
            if (state === 'places-list') {
                var id = this.el.getAttribute('id')
                var places_id = ['budapest', 'eiffeltower', 'tajmahal', 'newyork']
                if (places_id.includes(id)) {
                    places_container.setAttribute('thumbnail', {state: 'view', selected_card: id}) 
                }
            }

            if (state === 'view'){
                this.handleState()
            }

            if (state === 'changeView'){
                this.handleState()
            }
        })
    },

    handleState: function() {
        var el = this.el
        var id = el.getAttribute('id')
        var placesContainer = document.querySelector('#places_container')
        var {selectedItem_id} = placesContainer.getAttribute('cursor-listener')
        var sideViewPlacesID = ['place-1', 'place-2', 'place-3', 'place-4']
        if (sideViewPlacesID.includes(id)){
            var sky_el = document.querySelector('#main_container')
            sky_el.setAttribute('material', {src: `assets/360_images/${selectedItem_id}/${id}.jpg`, color: 'white'})
        }
    }

})