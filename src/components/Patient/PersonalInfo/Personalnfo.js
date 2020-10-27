import React, { Component, Fragment } from 'react';
import {Redirect} from 'react-router-dom';

import AuthContext from '../../context/auth-context';


const Mainpage = () => {
  // state = {
  //   postForm: POST_FORM,
  //   formIsValid: false,
  //   imagePreview: null
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     this.props.editing &&
  //     prevProps.editing !== this.props.editing &&
  //     prevProps.selectedPost !== this.props.selectedPost
  //   ) {
  //     const postForm = {
  //       title: {
  //         ...prevState.postForm.title,
  //         value: this.props.selectedPost.title,
  //         valid: true
  //       },
  //       image: {
  //         ...prevState.postForm.image,
  //         value: this.props.selectedPost.imagePath,
  //         valid: true
  //       },
  //       content: {
  //         ...prevState.postForm.content,
  //         value: this.props.selectedPost.content,
  //         valid: true
  //       }
  //     };
  //     this.setState({ postForm: postForm, formIsValid: true });
  //   }
  // }

  // postInputChangeHandler = (input, value, files) => {
  //   if (files) {
  //     generateBase64FromImage(files[0])
  //       .then(b64 => {
  //         this.setState({ imagePreview: b64 });
  //       })
  //       .catch(e => {
  //         this.setState({ imagePreview: null });
  //       });
  //   }
  //   this.setState(prevState => {
  //     let isValid = true;
  //     for (const validator of prevState.postForm[input].validators) {
  //       isValid = isValid && validator(value);
  //     }
  //     const updatedForm = {
  //       ...prevState.postForm,
  //       [input]: {
  //         ...prevState.postForm[input],
  //         valid: isValid,
  //         value: files ? files[0] : value
  //       }
  //     };
  //     let formIsValid = true;
  //     for (const inputName in updatedForm) {
  //       formIsValid = formIsValid && updatedForm[inputName].valid;
  //     }
  //     return {
  //       postForm: updatedForm,
  //       formIsValid: formIsValid
  //     };
  //   });
  // };

  // inputBlurHandler = input => {
  //   this.setState(prevState => {
  //     return {
  //       postForm: {
  //         ...prevState.postForm,
  //         [input]: {
  //           ...prevState.postForm[input],
  //           touched: true
  //         }
  //       }
  //     };
  //   });
  // };

  // cancelPostChangeHandler = () => {
  //   this.setState({
  //     postForm: POST_FORM,
  //     formIsValid: false
  //   });
  //   this.props.onCancelEdit();
  // };

  // acceptPostChangeHandler = () => {
  //   const post = {
  //     title: this.state.postForm.title.value,
  //     image: this.state.postForm.image.value,
  //     content: this.state.postForm.content.value
  //   };
  //   this.props.onFinishEdit(post);
  //   this.setState({
  //     postForm: POST_FORM,
  //     formIsValid: false,
  //     imagePreview: null
  //   });
  // };


    return (
      <AuthContext.Consumer>
        {(context) => {
          if (!context.token) {


          return  <Fragment>
              <h2>Hi!@</h2>
              {/* <Backdrop onClick={this.cancelPostChangeHandler} />
        <Modal
          title="New Post"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelPostChangeHandler}
          onAcceptModal={this.acceptPostChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'title')}
              valid={this.state.postForm['title'].valid}
              touched={this.state.postForm['title'].touched}
              value={this.state.postForm['title'].value}
            />
            <FilePicker
              id="image"
              label="Image"
              control="input"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'image')}
              valid={this.state.postForm['image'].valid}
              touched={this.state.postForm['image'].touched}
            />
            <div className="new-post__preview-image">
              {!this.state.imagePreview && <p>Please choose an image.</p>}
              {this.state.imagePreview && (
                <Image imageUrl={this.state.imagePreview} contain left />
              )}
            </div>
            <Input
              id="content"
              label="Content"
              control="textarea"
              rows="5"
              onChange={this.postInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, 'content')}
              valid={this.state.postForm['content'].valid}
              touched={this.state.postForm['content'].touched}
              value={this.state.postForm['content'].value}
            />
          </form>
        </Modal> */}
            </Fragment>
          } else {
            return <Redirect to="/"/>
          }
        }}
      </AuthContext.Consumer>
    )
  
}

export default FeedEdit;
