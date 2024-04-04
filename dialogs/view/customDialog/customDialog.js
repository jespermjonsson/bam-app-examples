const { dialog } = await bambuserAppFramework.getContext();

// Setup button click handler
document.querySelector('#accept').addEventListener('click', () => {
  const shopperName = document.querySelector('input[name="shopper-name"]').value;
  
  // Send message to opener about collected name
  dialog.emit({
    eventType: 'collect-name',
    payload: {
      shopperName,
    }
  });

  // Start count down and show the coupon code
  let countDown = 4;
  const interval = window.setInterval(() => {
    countDown--;
    if (countDown <= 0) {
      // When count down is over, automatically close the dialog
      window.clearInterval(interval);
      dialog.close({
        action: 'confirm',
        data: {
          shopperName,
        },
      });
    } else {
      document.querySelector('#count-down').innerText = countDown;
    }
  }, 1000);
  document.querySelector('#coupon').innerText = 'BUY1GET50OFF';
  document.querySelector('#step-1').style.display = 'none';
  document.querySelector('#step-2').style.display = '';
});

// Show dialog directly
dialog.setReady();