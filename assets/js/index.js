$("#add_pet").submit(function(event){
    alert("Dados inseridos com sucesso!");
})

$("#update_pet").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3020/api/pets/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Dados atualizados com sucesso!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3020/api/pets/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Tem certeza que quer deletar este registro de pet?")){
            $.ajax(request).done(function(response){
                alert("Dados excluídos com sucesso!");
                location.reload();
            })
        }

    })
}