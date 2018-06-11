function KeypressDistributionOfVotes(e) {
    var iCode = 0;
    if (!e) e = window.event;
    if (e.which) {
        iCode = e.which;
    }
    else if (e.keyCode) {
        iCode = e.keyCode;
    }
    else if (e.charCode) {
        iCode = e.charCode;
    }
    else {
        return true;
    }
    if (e.charCode && e.charCode == 0) return true;
    if (e.modifiers && (e.modifiers == e.ALT_MASK || e.modifiers == e.CONTROL_MASK || e.modifiers == e.META_MASK)) return true;
    if (e.ctrlKey || e.altKey) return true;
    if (iCode == 8 || iCode == 32 || iCode == 37 || iCode == 39) return true;
    if (iCode < 47 || iCode > 57) {
        if (e.preventDefault) e.preventDefault();
        if (e.returnValue) e.returnValue = false;
        return false;
    }
    else {
        return true;
    }
}
function KeyupDistributionOfVotes(id, iMinuendWhole, iMinuendNumerator, iMinuendDenominator, sText) {
    var i = 0;
    var iMax = 0;
    var iWhole = 0;
    var iNumerator = 0;
    var iDenominator = 0;
    var iSubtractedWhole = 0;
    var iSubtractedNumerator = 0;
    var iSubtractedDenominator = 0;
    var rText=/\s*((\d+\s*)|(\d+\s*\/\s*\d+)|(\d+\s+\d+\s*\/\s*\d+))\s*/; // если эта регулярка проходит, значит текст содержит правильное число.
    var o;
    var oDiv;
    var oSpan;
    var oTable;
    var oTr;
    var oTd;
    o = document.getElementById(id);
    iMax = o.childNodes.length - 1;
    sText = String(sText);
    for (i = iMax; i >= 0; i--) o.removeChild(o.childNodes[i]);
    if (sText.search(rText)==0)
    {
        iSubtractedWhole = getWholeFromText(sText);
        //alert("целая="+iSubtractedWhole);
        iSubtractedNumerator = getNumeratorFromText(sText);
        //alert("числитель="+iSubtractedNumerator);
        iSubtractedDenominator = getDenominatorFromText(sText);
        //alert("знаменатель="+iSubtractedDenominator);
        if (iMinuendNumerator == 0) iMinuendDenominator = 1;
        if (iSubtractedNumerator == 0) iSubtractedDenominator = 1;
        iWhole = getDifferenceWhole(iMinuendWhole, iMinuendNumerator, iMinuendDenominator, iSubtractedWhole, iSubtractedNumerator, iSubtractedDenominator);
        iNumerator = getDifferenceNumerator(iMinuendWhole, iMinuendNumerator, iMinuendDenominator, iSubtractedWhole, iSubtractedNumerator, iSubtractedDenominator);
        iDenominator = getDifferenceDenominator(iMinuendWhole, iMinuendNumerator, iMinuendDenominator, iSubtractedWhole, iSubtractedNumerator, iSubtractedDenominator);
        if (iNumerator == 0) {
            oSpan = o.insertBefore(document.createElement("span"), o.firstChild);
            oSpan.appendChild(document.createTextNode(iWhole));
        }
        else
        {
            oDiv = o.insertBefore(document.createElement("table"), o.firstChild);
            oDiv.className = "fraction";
            oTable = oDiv.appendChild(document.createElement("table"));
            oTable.className = "sub-table";
            oTr = oTable.insertRow(0);
            oTd = oTr.insertCell(0);
            oTd.className = "sub-table__total";
            oTd.rowSpan = 2;
            if (iWhole!=0)oTd.appendChild(document.createTextNode(iWhole));
            oTd = oTr.insertCell(1);
            oTd.className = "sub-table__numerator";
            oTd.appendChild(document.createTextNode(iNumerator));
            oTr = oTable.insertRow(1);
            oTd = oTr.insertCell(0);
            oTd.className = "sub-table__denominator";
            oTd.appendChild(document.createTextNode(iDenominator));
        }
    }
}
function getWholeFromText(sText) {
    var rNoWhole = /\s*\d+\s*\/\s*\d+\s*/; // если эта регулярка идёт c начала строки, значит текст не содержит целую часть.
    var rAllParts = /\s*\d+\s+\d+\s*\/\s*\d+\s*/; // если эта регулярка проходит, значит текст содержит не только целую часть, но и дробную.
    //alert("[" + String(sText).trim().split(/\s+/)[0] + "]");
    if (sText.search(rNoWhole) == 0) return 0;
    if (sText.search(rAllParts) == 0) return String(sText).trim().split(/\s+/)[0];

    return String(sText).trim();
}
function getNumeratorFromText(sText) {
    var rNoWhole = /\s*\d+\s*\/\s*\d+\s*/; // если эта регулярка идёт c начала строки, значит текст не содержит целую часть.
    var rAllParts = /\s*\d+\s+\d+\s*\/\s*\d+\s*/; // если эта регулярка проходит, значит текст содержит не только целую часть, но и дробную.
    if (sText.search(rNoWhole) == 0) return sText.split("/")[0].trim();
    if (sText.search(rAllParts) == 0) return String(sText).trim().split(/\s+/)[1].split(/\s*\/\s*/)[0].trim();
    return 0;
}
function getDenominatorFromText(sText) {
    var rNoWhole = /\s*\d+\s*\/\s*\d+\s*/; // если эта регулярка идёт c начала строки, значит текст не содержит целую часть.
    var rAllParts = /\s*\d+\s+\d+\s*\/\s*\d+\s*/; // если эта регулярка проходит, значит текст содержит не только целую часть, но и дробную.
    if (sText.search(rNoWhole) == 0) return sText.split("/")[1].trim();
    if (sText.search(rAllParts) == 0) return String(sText).trim().split(/\s+/)[1].split(/\s*\/\s*/)[1].trim();
    return 0;
}
function getNokFirst(iFirst,iSecond) {
    if (isNaN(iFirst) || isNaN(iSecond)) return NaN;
    var i1 = 0;
    var i2 = 0;
    var iMax = 0;
    var iAbsFirst = Math.abs(iFirst);
    var iAbsSecond = Math.abs(iSecond);
    if (iAbsFirst > iAbsSecond) iMax = iAbsFirst; else iMax = iAbsSecond;
    for (i1 = 1; i1 <= iMax; i1++)for (i2 = 1; i2 <= iMax; i2++)if (iAbsFirst * i1 == iAbsSecond * i2) return i1;
    return null;
}
function getDifferenceWhole(iMinuendWhole, iMinuendNumerator, iMinuendDenominator, iSubtractedWhole, iSubtractedNumerator, iSubtractedDenominator) {
    if (isNaN(iMinuendWhole) || isNaN(iMinuendNumerator) || isNaN(iMinuendDenominator) || isNaN(iSubtractedWhole) || isNaN(iSubtractedNumerator) || isNaN(iSubtractedDenominator)) return NaN;
    var iNokFirst = getNokFirst(iMinuendDenominator, iSubtractedDenominator);
    var iNok = iMinuendDenominator * iNokFirst;
    var iNokSecond = iNok / iSubtractedDenominator;
    return Math.floor(((iMinuendWhole * iNok + iMinuendNumerator * iNokFirst) - (iSubtractedWhole * iNok + iSubtractedNumerator * iNokSecond)) / iNok);
}
function getDifferenceNumerator(iMinuendWhole, iMinuendNumerator, iMinuendDenominator, iSubtractedWhole, iSubtractedNumerator, iSubtractedDenominator) {
    if (isNaN(iMinuendWhole) || isNaN(iMinuendNumerator) || isNaN(iMinuendDenominator) || isNaN(iSubtractedWhole) || isNaN(iSubtractedNumerator) || isNaN(iSubtractedDenominator)) return NaN;
    var i = 0;
    var iMax = 0;
    var iNokFirst = getNokFirst(iMinuendDenominator, iSubtractedDenominator);
    var iNok = iMinuendDenominator * iNokFirst;
    var iNokSecond = iNok / iSubtractedDenominator;
    var iNumerator = ((iMinuendWhole * iNok + iMinuendNumerator * iNokFirst) - (iSubtractedWhole * iNok + iSubtractedNumerator * iNokSecond)) % iNok;
    var iDenominator = iNok;
    if (Math.floor(iDenominator / 2) >= iNumerator)
    {
        iMax = iNumerator;
    }
    else
    {
        iMax = Math.floor(iNumerator / 2)
    }
    for (i = iMax; i >= 2; i--)if (iNumerator % i == 0 && iDenominator % i == 0) return iNumerator / i;
    return iNumerator;
}
function getDifferenceDenominator(iMinuendWhole, iMinuendNumerator, iMinuendDenominator, iSubtractedWhole, iSubtractedNumerator, iSubtractedDenominator) {
    if (isNaN(iMinuendWhole) || isNaN(iMinuendNumerator) || isNaN(iMinuendDenominator) || isNaN(iSubtractedWhole) || isNaN(iSubtractedNumerator) || isNaN(iSubtractedDenominator)) return NaN;
    var i = 0;
    var iMax = 0;
    var iNokFirst = getNokFirst(iMinuendDenominator, iSubtractedDenominator);
    var iNok = iMinuendDenominator * iNokFirst;
    var iNokSecond = iNok / iSubtractedDenominator;
    var iNumerator = ((iMinuendWhole * iNok + iMinuendNumerator * iNokFirst) - (iSubtractedWhole * iNok + iSubtractedNumerator * iNokSecond)) % iNok;
    var iDenominator = iNok;
    if (Math.floor(iDenominator / 2) >= iNumerator) {
        iMax = iNumerator;
    }
    else {
        iMax = Math.floor(iNumerator / 2)
    }
    for (i = iMax; i >= 2; i--)if (iNumerator % i == 0 && iDenominator % i == 0) return iDenominator / i;
    return iDenominator;
}