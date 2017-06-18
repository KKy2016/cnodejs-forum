import Timeago from 'timeago.js'

const timeago = new Timeago()

function formatTime(time) {
    return timeago.format(time, 'zh_CN')
}

// 计算label
function getLabel(tab, good, top) {
    if (top) {
        return {
            class: 'top',
            cont: '置顶'
        }
    }
    if (good) {
        return {
            class: 'good',
            cont: '精华'
        }
    }
    switch (tab) {
        case 'share':
            return {
                class: 'share',
                cont: '分享'
            }
        case 'ask':
            return {
                class: 'ask',
                cont: '问答'
            }
        case 'job':
            return {
                class: 'job',
                cont: '工作'
            }
        default :
            return {
                class: 'none',
                cont: '暂无'
            }
    }
}

export {
    formatTime,
    getLabel
}
