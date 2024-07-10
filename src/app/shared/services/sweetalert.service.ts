import swal from 'sweetalert2';

export class SweetalertService {
    public static errorAlert(title: string, text: string){
        swal.fire({
            title,
            text,
            icon: "error",
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
        });
    }

    public static successAlert(title: string, text: string){
        swal.fire({
            title,
            text,
            icon: "success",
            customClass: {
              confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false,
          });
    }

    public static successAlertWithFunc(title: string, text: string, func: Function){
      swal.fire({
          title,
          text,
          icon: "success",
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
        }).then(() => {
          func()
        })
  }

    public static autoCloseSuccessAlert(title: string, text: string, timer: number){
        let timerInterval
        swal.fire({
          title,
          text,
          timer,
          icon: "success",
          timerProgressBar: true,
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false,
          showConfirmButton: false,
          onBeforeOpen: () => {
            swal.showLoading()
            timerInterval = setInterval(() => {
              const content = swal.getContent()
              if (content) {
                const b = content.querySelector('b')
                if (b) {
                  b.textContent = swal.getTimerLeft().toString()
                }
              }
            }, timer)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === swal.DismissReason.timer) {
          }
        })
    }


}  