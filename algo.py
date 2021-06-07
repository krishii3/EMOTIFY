
def results(trait,trait_name):
    if(trait>=0.60 and trait<0.90):
        return("Fairly good in " + trait_name)
    if(trait>=0.90):
        return("Very good in " + trait_name)
    if(trait<0.60 and trait>=0.30):
        return("Below average in " + trait_name)
    if(trait<0.30):
        return("Poor, Need some work in " + trait_name)

def algo(data):
    correct=data['score']
    total_rounds=len(data['array'])
    wrong=total_rounds - correct    
    failed_perc=(wrong/correct)
    correct_perc= 1-failed_perc
    timings=data['array']
    skip=0
    
    accuracy = correct_perc - failed_perc
    time = 1- (sum(data['array'])/(total_rounds*500))
    ps= correct_perc -skip
    #score_percentile = #data related 
    unified=(accuracy+time+ps)/3

    total_traits={"accuracy":accuracy,"time":time,"Problem Solving":ps,"unified":unified}
    print(total_traits)

    Final_analysis=[]
    for i,j in (total_traits.items()):
        if(i=="unified"):
            continue
        Final_analysis.append(results(j, i))
    
    for a in Final_analysis:
        print(a)



    return Final_analysis

    
