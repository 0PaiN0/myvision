let titleElement = null;
let backButtonElement = null;
let imagesTableElement = null;
let buttonsGroupElement = null;
let uploadButtonElement = null;
let annotationsTableElement = null;
let uploadDatasetsModalElement = null;
let imagesTableOuterContainerElement = null;
let uploadDatasetFilesTriggerElement = null;
let uploadDatasetsOuterContainerElement = null;
let annotationsTableOuterContainerElement = null;
let errorRowIndex = 0;
const modalWidth = 505;
const modalHeight = 340;
const ANNOTATION_FILE_ERROR_POPOVER_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-error-row-popover-left';
const ANNOTATION_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-error-row-popover-arrow-left';
const IMAGE_FILE_ERROR_POPOVER_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-error-row-popover-right';
const IMAGE_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS = 'upload-datasets-modal-upload-datasets-table-error-row-popover-arrow-right';
const ANNOTAIONS_TABLE_INDICATOR = 'annotations';
const IMAGES_TABLE_INDICATOR = 'images';

function createTableRowElementMarkup(fileName) {
  return `
    <div class="upload-datasets-modal-upload-datasets-table-row">
    <div onmouseenter="displayActiveRemoveFileIcon(this)" onmouseleave="displayDefaultRemoveFileIcon(this)">
          <img src="x-icon-default.svg" class="upload-datasets-modal-delete-file-button"  alt="remove">
          <img src="x-icon-active.svg" style="display: none" class="upload-datasets-modal-delete-file-button" alt="remove">
        </div>
      <div class="upload-datasets-modal-upload-datasets-table-row-text">${fileName}</div>
    </div>
  `;
}

function createTableRowElementMarkupWthError(fileName, message, popoverPositionClass,
  popoverArrowClass, tableName, index) {
  return `
    <div id="upload-datasets-modal-file-error-popover-${index}" class="popover upload-datasets-modal-upload-datasets-table-error-row-popover ${popoverPositionClass}">${message}</div>
    <div id="upload-datasets-modal-file-error-popover-arrow-${index}" style="margin-left: ${(modalWidth / 2 / 2) - 20}px;" class="arrow default-arrow-position ${popoverArrowClass}"></div>
    <div class="upload-datasets-modal-upload-datasets-table-row">
        <div onmouseenter="displayActiveRemoveFileIcon(this)" onmouseleave="displayDefaultRemoveFileIcon(this)">
          <img src="x-icon-default.svg" class="upload-datasets-modal-delete-file-button"  alt="remove">
          <img src="x-icon-active.svg" style="display: none" class="upload-datasets-modal-delete-file-button" alt="remove">
        </div>
        <div class="upload-datasets-modal-upload-datasets-table-row-text upload-datasets-modal-upload-datasets-table-row-text-error" onmouseenter="displayUploadDatasetsAnnotationFileErrorPopover(${index}, '${tableName}')" onmouseleave="removeUploadDatasetsAnnotationFileErrorPopover(${errorRowIndex})">${fileName}</div>
    </div>
  `;
}

window.displayUploadDatasetsAnnotationFileErrorPopover = (id, tableName) => {
  const tableOuterContainerElement = tableName === ANNOTAIONS_TABLE_INDICATOR
    ? annotationsTableOuterContainerElement : imagesTableOuterContainerElement;
  document.getElementById(`upload-datasets-modal-file-error-popover-${id}`).style.display = 'block';
  document.getElementById(`upload-datasets-modal-file-error-popover-${id}`).style.marginTop = `-${tableOuterContainerElement.scrollTop + 30}px`;
  document.getElementById(`upload-datasets-modal-file-error-popover-arrow-${id}`).style.display = 'block';
  document.getElementById(`upload-datasets-modal-file-error-popover-arrow-${id}`).style.marginTop = `-${tableOuterContainerElement.scrollTop + 4}px`;
};

window.removeUploadDatasetsAnnotationFileErrorPopover = (id) => {
  document.getElementById(`upload-datasets-modal-file-error-popover-${id}`).style.display = 'none';
  document.getElementById(`upload-datasets-modal-file-error-popover-arrow-${id}`).style.display = 'none';
};

window.displayActiveRemoveFileIcon = (element) => {
  element.childNodes[1].style.display = 'none';
  element.childNodes[3].style.display = '';
};

window.displayDefaultRemoveFileIcon = (element) => {
  element.childNodes[1].style.display = '';
  element.childNodes[3].style.display = 'none';
};

function getFileName(tableBody, rowIndex) {
  if (tableBody.childNodes[rowIndex].childNodes[0].childNodes[1].id.startsWith('upload-datasets-modal-file-error-popover-')) {
    return {
      fileName: tableBody.childNodes[rowIndex].childNodes[0].childNodes[5].childNodes[1].innerHTML,
      currentRowHasError: true,
    };
  }
  return {
    fileName: tableBody.childNodes[rowIndex].childNodes[0].childNodes[1].childNodes[1].innerHTML,
    currentRowHasError: false,
  };
}

function checkFileAlreadyInTable(newFileName, validationResult, tableElement,
  popoverPositionClass, popoverArrowPositionClass) {
  const tableBody = tableElement.childNodes[1];
  for (let i = 0; i < tableBody.childNodes.length; i += 1) {
    const { fileName, currentRowHasError } = getFileName(tableBody, i);
    if (newFileName === fileName) {
      if (validationResult.error) {
        const tableName = tableElement.id === 'upload-datsets-modal-upload-datasets-annotations-table' ? ANNOTAIONS_TABLE_INDICATOR : IMAGES_TABLE_INDICATOR;
        const rowParentElement = tableBody.childNodes[i].childNodes[0];
        rowParentElement.innerHTML = createTableRowElementMarkupWthError(
          newFileName, validationResult.message, popoverPositionClass, popoverArrowPositionClass,
          tableName, errorRowIndex += 1,
        );
      } else if (currentRowHasError && !validationResult.error) {
        const rowParentElement = tableBody.childNodes[i].childNodes[0];
        rowParentElement.innerHTML = createTableRowElementMarkup(newFileName);
      }
      return true;
    }
  }
  return false;
}

function insertRowToImagesTable(fileName, validationResult) {
  if (!checkFileAlreadyInTable(fileName, validationResult,
    imagesTableElement, IMAGE_FILE_ERROR_POPOVER_POSITION_CLASS,
    IMAGE_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS)) {
    const row = imagesTableElement.insertRow(-1);
    const cell = row.insertCell(0);
    if (validationResult.error) {
      cell.innerHTML = createTableRowElementMarkupWthError(fileName, validationResult.message,
        IMAGE_FILE_ERROR_POPOVER_POSITION_CLASS, IMAGE_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS,
        IMAGES_TABLE_INDICATOR, errorRowIndex += 1);
    } else {
      cell.innerHTML = createTableRowElementMarkup(fileName);
    }
  }
}

function changeAllAnnotationsTableRowsToHaveError(errorMessage) {
  const tableBody = annotationsTableElement.childNodes[1];
  for (let i = 0; i < tableBody.childNodes.length; i += 1) {
    const rowParentElement = tableBody.childNodes[i].childNodes[0];
    const { fileName } = getFileName(tableBody, i);
    rowParentElement.innerHTML = createTableRowElementMarkupWthError(
      fileName, errorMessage, ANNOTATION_FILE_ERROR_POPOVER_POSITION_CLASS,
      ANNOTATION_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS,
      ANNOTAIONS_TABLE_INDICATOR, errorRowIndex += 1,
    );
  }
}

function insertRowToAnnotationsTable(fileName, validationResult) {
  if (!checkFileAlreadyInTable(fileName, validationResult,
    annotationsTableElement, ANNOTATION_FILE_ERROR_POPOVER_POSITION_CLASS,
    ANNOTATION_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS)) {
    const row = annotationsTableElement.insertRow(-1);
    const cell = row.insertCell(0);
    if (validationResult.error) {
      cell.innerHTML = createTableRowElementMarkupWthError(fileName, validationResult.message,
        ANNOTATION_FILE_ERROR_POPOVER_POSITION_CLASS,
        ANNOTATION_FILE_ERROR_POPOVER_ARROW_POSITION_CLASS,
        ANNOTAIONS_TABLE_INDICATOR, errorRowIndex += 1);
    } else {
      cell.innerHTML = createTableRowElementMarkup(fileName);
    }
  }
}

function setTitleElement(title) {
  titleElement.innerHTML = title;
}

function setTitleElementMarginTop(pixels) {
  titleElement.style.marginTop = pixels;
}

function resetTitleElementMarginTop() {
  titleElement.style.marginTop = '';
}

function setButtonGroupElementMarginTop(pixels) {
  buttonsGroupElement.style.marginTop = pixels;
}

// should be a global variable
function isFirefox() {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
}

function setButtonGroupElementMarginTopByBrowser() {
  if (!isFirefox()) {
    setButtonGroupElementMarginTop('3px');
  } else {
    setButtonGroupElementMarginTop('1px');
  }
}

function resetButtonGroupElementMarginTop() {
  buttonsGroupElement.style.marginTop = '';
}

function displayUploadButtonElement() {
  uploadButtonElement.style.display = '';
}

function hideUploadButtonElement() {
  uploadButtonElement.style.display = 'none';
}

function displayBackButton() {
  backButtonElement.style.display = '';
}

function hideBackButton() {
  backButtonElement.style.display = 'none';
}

function displayUploadDatasetsOuterContainerElement() {
  uploadDatasetsOuterContainerElement.style.display = '';
}

function hideUploadDatasetsOuterContainerElement() {
  uploadDatasetsOuterContainerElement.style.display = 'none';
}

function setTriggerAcceptedFileFormat(format) {
  uploadDatasetFilesTriggerElement.accept = format;
}

function changeUploadDatasetsModalElementDimensions(width, height) {
  uploadDatasetsModalElement.style.width = `${width}px`;
  uploadDatasetsModalElement.style.height = `${height}px`;
}

function resetUploadDatasetsModalElementDimensions() {
  uploadDatasetsModalElement.style.width = '';
  uploadDatasetsModalElement.style.height = '';
}

window.uploadDatasetsModalImagesTableScroll = () => {
  annotationsTableOuterContainerElement.scrollTo(0, imagesTableOuterContainerElement.scrollTop);
};

window.uploadDatasetsModalAnnotationsTableScroll = () => {
  imagesTableOuterContainerElement.scrollTo(0, annotationsTableOuterContainerElement.scrollTop);
};

// will later take an object argument with relevant input attributes
function prepareUploadDatasetsView() {
  setTitleElementMarginTop('8px');
  setTitleElement('COCO JSON');
  setTriggerAcceptedFileFormat('.json, image/*');
  displayBackButton();
  displayUploadButtonElement();
  setButtonGroupElementMarginTopByBrowser();
  displayUploadDatasetsOuterContainerElement();
  changeUploadDatasetsModalElementDimensions(modalWidth, modalHeight);
}

function hideUploadDatasetsViewAssets() {
  hideBackButton();
  hideUploadButtonElement();
  resetTitleElementMarginTop();
  resetButtonGroupElementMarginTop();
  hideUploadDatasetsOuterContainerElement();
  resetUploadDatasetsModalElementDimensions();
}

function assignUploadDatasetsViewLocalVariables() {
  buttonsGroupElement = document.getElementById('upload-datasets-modal-buttons');
  titleElement = document.getElementById('upload-datsets-modal-upload-datasets-title');
  uploadDatasetsOuterContainerElement = document.getElementById('upload-datsets-modal-upload-datasets-outer-container');
  uploadButtonElement = document.getElementById('upload-datasets-modal-upload-datasets-upload-button');
  uploadDatasetFilesTriggerElement = document.getElementById('upload-datasets-modal-upload-datasets-upload-trigger');
  backButtonElement = document.getElementById('upload-datasets-modal-back-button');
  imagesTableElement = document.getElementById('upload-datsets-modal-upload-datasets-images-table');
  imagesTableOuterContainerElement = document.getElementById('upload-datsets-modal-upload-datasets-images-table-outer-container');
  annotationsTableOuterContainerElement = document.getElementById('upload-datsets-modal-upload-datasets-annotations-table-outer-container');
  annotationsTableElement = document.getElementById('upload-datsets-modal-upload-datasets-annotations-table');
  uploadDatasetsModalElement = document.getElementById('upload-datasets-modal-parent');
}

export {
  hideUploadDatasetsViewAssets, insertRowToImagesTable,
  assignUploadDatasetsViewLocalVariables, prepareUploadDatasetsView,
  changeAllAnnotationsTableRowsToHaveError, insertRowToAnnotationsTable,
};
