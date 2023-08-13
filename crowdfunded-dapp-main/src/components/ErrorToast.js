const ErrorToast = (toast, message) => 

toast({
    title: 'Error',
    description: message || 'an error occured',
    status: 'error',
    position: 'top',
    duration: 9000,
    isClosable: true,
}

)



export default ErrorToast