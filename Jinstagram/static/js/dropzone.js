$(document).ready(function() {
    $("#input_file").bind('change', function() {
        if (totalFileSize==0){
           selectFile(this.files);
        }else{
           return
        }
    });
});

// 파일 리스트 번호
var fileIndex = 0;
// 등록할 전체 파일 사이즈
var totalFileSize = 0;
// 파일 리스트
var fileList = new Array();
// 파일 사이즈 리스트
var fileSizeList = new Array();
// 등록 가능한 파일 사이즈 MB
var uploadSize = 50;
// 등록 가능한 총 파일 사이즈 MB
var maxUploadSize = 500;

$(function() {
    // 파일 드롭 다운
    fileDropDown();
});

// 파일 드롭 다운
function fileDropDown() {
    var dropZone = $("#dropZone");
    //Drag기능
    dropZone.on('dragenter', function(e) {
        e.stopPropagation();
        e.preventDefault();
        // 드롭다운 영역 css
        dropZone.css('background-color', '#E3F2FC');
    });
    dropZone.on('dragleave', function(e) {
        e.stopPropagation();
        e.preventDefault();
        // 드롭다운 영역 css
        dropZone.css('background-color', '#FFFFFF');
    });
    dropZone.on('dragover', function(e) {
        e.stopPropagation();
        e.preventDefault();
        // 드롭다운 영역 css
        dropZone.css('background-color', '#E3F2FC');
    });
    dropZone.on('drop', function(e) {
        e.preventDefault();
        // 드롭다운 영역 css
        dropZone.css('background-color', '#FFFFFF');
        var files = e.originalEvent.dataTransfer.files;

        if (totalFileSize==0){
        }else{
           return
        }

        if (files != null) {
            if (files.length < 1) {
                /* alert("폴더 업로드 불가"); */
                console.log("폴더 업로드 불가");
                return;
            } else if ( files.length > 1) {
                console.log("너무 많아");
                return;
            }else {
                   selectFile(files);
            }
        } else {
            alert("ERROR");
        }
    });
}

// 파일 선택시
function selectFile(fileObject) {
    var files = null;

    if (fileObject != null) {
        // 파일 Drag 이용하여 등록시
        files = fileObject;
    } else {
        // 직접 파일 등록시
        files = $('#multipaartFileList_' + fileIndex)[0].files;
    }

    // 다중파일 등록
    if (files != null) {
        if (files != null && files.length > 1) {
            return
        } else if(files != null && files.length == 1){
            $("#fileDragDesc").hide();
            $("fileListTable").show();
        }else {
            $("#fileDragDesc").show();
            $("fileListTable").hide();
        }

        for (var i = 0; i < files.length; i++) {
            // 파일 이름
            var fileName = files[i].name;
            var fileNameArr = fileName.split(".");

            // 확장자
            var ext = fileNameArr[fileNameArr.length - 1];

            var fileSize = files[i].size; // 파일 사이즈(단위 :byte)
            // console.log("fileSize="+fileSize);
            if (fileSize <= 0) {
                console.log("0kb file return");
                return;
            }

            var fileSizeKb = fileSize / 1024; // 파일 사이즈(단위 :kb)
            var fileSizeMb = fileSizeKb / 1024;    // 파일 사이즈(단위 :Mb)

            var fileSizeStr = "";
            if ((1024*1024) <= fileSize) {    // 파일 용량이 1메가 이상인 경우
                // console.log("fileSizeMb="+fileSizeMb.toFixed(2));
                fileSizeStr = fileSizeMb.toFixed(2) + " Mb";
            } else if ((1024) <= fileSize) {
                // console.log("fileSizeKb="+parseInt(fileSizeKb));
                fileSizeStr = parseInt(fileSizeKb) + " kb";
            } else {
                // console.log("fileSize="+parseInt(fileSize));
                fileSizeStr = parseInt(fileSize) + " byte";
            }

            /* if ($.inArray(ext, [ 'exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml' ]) >= 0) {
                // 확장자 체크
                alert("등록 불가 확장자");
                break; */
            if ($.inArray(ext, [ 'hwp', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'png', 'pdf', 'jpg', 'jpeg', 'gif', 'zip' ]) <= 0) {
                // 확장자 체크
                /* alert("등록이 불가능한 파일 입니다.");
                break; */
                alert("등록이 불가능한 파일 입니다.("+fileName+")");
            } else if (fileSizeMb > uploadSize) {
                // 파일 사이즈 체크
                alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
                break;
            } else {
                // img url
                url = window.URL.createObjectURL(files[0])
                // console.log(url)

                // 전체 파일 사이즈
                totalFileSize += fileSizeMb;

                // 파일 배열에 넣기
                fileList[fileIndex] = files[i];

                // 파일 사이즈 배열에 넣기
                fileSizeList[fileIndex] = fileSizeMb;

                // 업로드 파일 목록 생성
                addFileList(fileIndex, fileName, fileSizeStr,url);

                // 파일 번호 증가
                fileIndex++;
            }
        }
    } else {
        alert("ERROR");
    }
}

// 업로드 파일 목록 생성
function addFileList(fIndex, fileName, fileSizeStr, url) {
    /* if (fileSize.match("^0")) {
        alert("start 0");
    } */

    // console.log(url)

    var html = "";
    html += "<tr id='fileTr_" + fIndex + "'>";
    html += "    <td> <img src=" + url + " height='200'> </td>"
    html += "    <td style='width=100px; font-size:15px;'>   "
    html +=  fileName + " (" + fileSizeStr +") "
            //+ "<a href='#' onclick='deleteFile(" + fIndex + "); return false;' class='btn small bg_02'> 삭제</a>"
            + "<input value='삭제' type='button' href='#' onclick='deleteFile(" + fIndex + "); return false;'>"
    html += "    </td>"
    html += "</tr>"

    $('#fileTableTbody').append(html);
}

// 업로드 파일 삭제
function deleteFile(fIndex) {
    console.log("deleteFile.fIndex=" + fIndex);

    // 전체 파일 사이즈 수정
    totalFileSize -= fileSizeList[fIndex];

    // 파일 배열에서 삭제
    delete fileList[fIndex];

    // 파일 사이즈 배열 삭제
    delete fileSizeList[fIndex];

    // 업로드 파일 테이블 목록에서 삭제
    $("#fileTr_" + fIndex).remove();

    // console.log("totalFileSize="+totalFileSize);

    if (totalFileSize > 0) {
        $("#fileDragDesc").hide();
        $("fileListTable").show();
    } else {
        $("#fileDragDesc").show();
        $("fileListTable").hide();
    }
}

// 파일 등록
function uploadFile() {
    // 등록할 파일 리스트
    var uploadFileList = Object.keys(fileList);

    // 파일이 있는지 체크
    if (uploadFileList.length == 0) {
        // 파일등록 경고창
        alert("파일이 없습니다.");
        return;
    }else if(uploadFileList.length > 1){
        alert("파일이 많아.");
        return
    };

    // 용량을 500MB를 넘을 경우 업로드 불가
    if (totalFileSize > maxUploadSize) {
        // 파일 사이즈 초과 경고창
        alert("총 용량 초과\n총 업로드 가능 용량 : " + maxUploadSize + " MB");
        return;
    }

    if (confirm("등록 하시겠습니까?")) {
        // 등록할 파일 리스트를 formData로 데이터 입력
        var form = $('#uploadForm');
        var formData = new FormData(form[0]);

        var image = $("img").attr('src').replace(/^url\(['"](.+)['"]\)/, '$1');
        var content = $('#input_content').val();
//        var profile_image = $('#input_profile_image').attr('src');
//        var profile_image = "{{ user.profile_image }}";

//        var user_id = $('#input_user_id').text();
//        var user_id = "{{ user.nicknmae }}"
//        var email = "user_id@naver.com";
//        var email = request.session.get('email', None)
//        var like_count = 10;
        var file = fileList[0];

//        console.log(email)
//        return

        formData.append('file', file);
        formData.append('image', image);
        formData.append('content', content);
//        formData.append('profile_image', profile_image);
//        formData.append('user_id', user_id);
//        formData.append('email', email);
//        formData.append('like_count', like_count);


//        // 여러파일의 테이블일때
//        for (var i = 0; i < uploadFileList.length; i++) {
//            formData.append('files', fileList[uploadFileList[i]]);
//        }

        writeFeed(formData)
        window.location.reload()
    }
}

function writeFeed(formData) {
        $.ajax({
            url : "/content/upload/",
            data : formData,
            type : 'POST',
            enctype : 'multipart/form-data/',
            processData : false,
            contentType : false,
            cache : false,
            success : function(result) {
                if (result.length >= 0) {
                    console.log("성공");
                    //window.location.reload();
                } else {
                    console.log(result.length)
                    console.log("실패");
                    //window.location.reload();
                }
            },
            error : function(request,status,error) {
                console.log(status + " error");
            },
            complete : function(result) {
                console.log("완료");
                //window.location.reload();
            },
        });
}