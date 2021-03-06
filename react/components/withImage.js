import React, { Component } from 'react'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

/**
 * HOC used for lazily load an image in the 'images' folder right above
 * this component.
 *
 * Used for loading the logos for the Footer
 *
 * @param {Function} getImageFilename
 */
export default getImageFilename => {
  return WrappedComponent => {
    class WithImage extends Component {
      static displayName = `WithImage(${getDisplayName(WrappedComponent)})`

      state = {}

      componentDidMount() {
        const imageName = getImageFilename(this.props)
        import(`../images/${imageName}`).then(imageSrc => {
          this.setState({ imageSrc: imageSrc.default })
        })
      }

      render() {
        const { imageSrc } = this.state
        return <WrappedComponent {...this.props} imageSrc={imageSrc} />
      }
    }

    return WithImage
  }
}
