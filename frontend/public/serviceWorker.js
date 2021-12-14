const self = this

console.log('got to serviceWorker')

// Install serviceWorkerasd
self.addEventListener('install', event => {
    console.log('serviceWorker has been installed')
})

// Listen for the activate event
self.addEventListener('activate', event => {
    console.log('serviceWorker has been activated')
})

// Fetch event
self.addEventListener('fetch', event => {
    // console.log('fetch event occurred', event)
})