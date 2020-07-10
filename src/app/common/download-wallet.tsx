import React from 'react';
import { ModalCloseIcon } from 'selfkey-ui/build-esnext/lib/icons';
import { WithStyles, withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  modal: {
    position: 'absolute',
    width: '800px',
    background: '#262F39',
    transform: 'translate(-50%, 0%)',
    left: '50%',
    padding: '60px',
    textAlign: 'center',
    '& h2': {
      fontSize: '24px',
      color: '#93B0C1',
      margin: '40px auto'
    },
    '& p': {
      fontSize: '16px',
      color: '#93B0C1',
    },
    '& hr': {
      borderColor: '#475768',
      margin: '20px auto'
    }
  },
  modalClose: {
    position: 'absolute',
    top: '-15px',
    right: '-15px'
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      display: 'block',
      height: '60px'
    }
  }
});

type DownloadWalletProps = WithStyles<typeof styles> & {
  onClose: () => any;
}

const DownloadWallet = withStyles(styles)(
  ({ classes, onClose }: DownloadWalletProps) => (
    <div className={classes.modal}>
      <ModalCloseIcon css={{}} className={classes.modalClose} onClick={onClose} />
      <img src="/images/macbook.png" />
      <h1>Selfkey Wallet Required</h1>
      <h2>To continue with the incorporation process please install the SelfKey Identity Wallet App.</h2>
      <div className={classes.download}>
        <img src="/images/download-win.png" />
        <img src="/images/download-mac.png" />
        <img src="/images/download-linux.png" />
      </div>
      <hr />
      <p>
      SeflKey Identity Wallet is free to use, and with it you can manage your crypto assets, safely store your identity informations and apply for finanical services in the marketplace.
      </p>
    </div>
  )
);

export { DownloadWallet };
export default DownloadWallet;


