  var frmvalidator  = new Validator("frmLogin");
    frmvalidator.EnableOnPageErrorDisplay();
    frmvalidator.EnableMsgsTogether();

    frmvalidator.addValidation("user","req","Sorry, we don't have a record of these log on details. Please try again.");
	frmvalidator.addValidation("user","minlen=4","Sorry, we don't have a record of these log on details. Please try again.");

	frmvalidator.addValidation("pass","req","Sorry, we don't have a record of these log on details. Please try again.");
	frmvalidator.addValidation("pass","minlen=4","Sorry, we don't have a record of these log on details. Please try again.");

