import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
          <div className='d-flex justify-content-center justify-content-md-start'>
            <MDBBtn
              rippleColor="dark"
              color='link'
              floating
              size="lg"
              className='text-dark m-1'
              href='https://www.facebook.com/zabeliarchitects'
              role='button'
            >
              <MDBIcon fab className='fab fa-facebook-f' />
            </MDBBtn>

            <MDBBtn
              rippleColor="dark"
              color='link'
              floating
              size="lg"
              className='text-dark m-1'
              href='https://www.google.com/search?q=zabeli+architects'
              role='button'
            >
              <MDBIcon fab className='fa-google' />
            </MDBBtn>

            <MDBBtn
              rippleColor="dark"
              color='link'
              floating
              size="lg"
              className='text-dark m-1'
              href='https://www.instagram.com/zabeliarchitects/'
              role='button'
            >
              <MDBIcon fab className='fa-instagram' />
            </MDBBtn>

            <MDBBtn
              rippleColor="dark"
              color='link'
              floating
              size="lg"
              className='text-dark m-1'
              href='https://www.linkedin.com/company/zabeli-architects/posts/?feedView=all'
              role='button'
            >
              <MDBIcon fab className='fa-linkedin' />
            </MDBBtn>
          </div>
          <a className='text-dark p-3 mt-3 mt-md-0' style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            © 2024 Zabeli Architects
          </a>
        </div>
      </MDBContainer>
    </MDBFooter>
  );
}
