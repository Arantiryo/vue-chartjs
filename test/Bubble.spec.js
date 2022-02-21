import { mount } from '@vue/test-utils'
import BubbleChart from './examples/BubbleChart.vue'

describe('BubbleChart', () => {
  const Component = {
    template:
      '<div><BubbleChart :chart-id="chartId" :plugins="plugins" /></div>',
    components: { BubbleChart },
    props: ['chartId', 'plugins']
  }

  it('should render a canvas', () => {
    const wrapper = mount(Component)

    const bubbleChartEl = wrapper.find('#bubble-chart')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)

    const canvasEl = wrapper.find('canvas')
    expect(canvasEl.exists()).toBe(true)
  })

  it('should change id based on prop', () => {
    const wrapper = mount(Component, {
      propsData: { chartId: 'bubblechartprop' }
    })

    const bubbleChartEl = wrapper.find('#bubblechartprop')
    expect(bubbleChartEl.element.id).not.toBe('undefined')
    expect(bubbleChartEl.exists()).toBe(true)
  })

  it('should destroy chart instance', done => {
    const wrapper = mount(Component)
    const { vm } = wrapper

    expect(vm.$children[0].$data._chart.ctx).not.toBe(null)

    vm.$destroy()

    vm.$nextTick(() => {
      vm.$forceUpdate()
      expect(vm.$children[0].$data._chart.ctx).toBe(null)
      done()
    })
  })

  it('should add inline plugins based on prop', () => {
    const testPlugin = {
      title: {
        display: true
      }
    }

    const wrapper = mount(Component, {
      propsData: { plugins: [testPlugin] }
    })
    const { vm } = wrapper

    expect(Object.keys(vm.$children[0].$data.options.plugins).length).toEqual(1)
  })
})