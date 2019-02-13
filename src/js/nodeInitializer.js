import renameme from './renameme'
import connection from './connection.js'
import roots from './roots.js'
const prefix = require('./prefix.js')()

export default function (node) {
    if (typeof node.hasAttribute !== 'function') {
        return
    }

    if (node.hasAttribute(`${prefix}:click`)) {
        renameme.attachClick(node, (method, params, el) => {
            console.time('request')
            connection.sendMethod(method, params, roots.findByEl(el))
        })
    }

    if (node.hasAttribute(`${prefix}:loading`)) {
        node.classList.add('hidden')
    }

    if (node.hasAttribute(`${prefix}:submit`)) {
        renameme.attachSubmit(node, (method, params, el) => {
            const root = roots.findByEl(el);

            connection.sendMethod(method, [params], root, el.getAttribute(`${prefix}:ref`))
        })
    }

    if (node.hasAttribute(`${prefix}:keydown.enter`)) {
        renameme.attachEnter(node, (method, params, el) => {
        console.time('request')
            connection.sendMethod(method, params, roots.findByEl(el))
        })
    }

    if (node.hasAttribute(`${prefix}:sync`)) {
        renameme.attachSync(node, (model, el) => {
        console.time('request')
            connection.sendSync(model, el.value, roots.findByEl(el))
        })
    }
}
