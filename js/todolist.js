$(function() {
    load();
    $('#title').on('keydown', function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === '') {

            } else {
                var local = getDate();
                console.log(local);
                local.push({ title: $(this).val(), done: false });
                setDate(local);
                load();
                $(this).val('');
            }

        }
    });

    $('ol,ul').on('click', 'a', function() {
        var data = getDate();
        var index = $(this).attr('id');
        console.log(index);

        data.splice(index, 1);
        setDate(data);
        load();
    });

    $('ol,ul').on('click', 'input', function() {
        var data = getDate();
        var index = $(this).siblings('a').attr('id');
        // console.log(index);
        data[index].done = $(this).prop('checked');
        // console.log(data)

        setDate(data);
        load();

    });



    function getDate() { //测试
        var data = localStorage.getItem('todolist');
        if (data !== null) {

            return JSON.parse(data)
        } else {
            return []
        }
    };



    function setDate(data) { //测试22222222222
        localStorage.setItem('todolist', JSON.stringify(data));
    };

    function load() {
        var data = getDate();
        $('ol,ul').empty();
        var todocount = 0;
        var donecount = 0;
        $.each(data, function(i, n) {
            if (n.done) {
                $('ul').prepend('<li><input type="checkbox" checked = "checked"><p>' + n.title + '</p><a href="javascript:;" id = ' + i + '></a></li>')
                donecount++;
            } else {
                $('ol').prepend('<li><input type="checkbox"><p>' + n.title + '</p><a href="javascript:;" id = ' + i + '></a></li>')
                todocount++;
            }

        })
        $('#todocount').text(todocount);
        $('#donecount').text(donecount);
    }
})