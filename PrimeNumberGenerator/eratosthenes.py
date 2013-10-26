'''
Sieve of Eratosthenes:

For more info http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes

The wikipedia article does a fine job of explaining how this
algorithm works.
'''

inputRange = int(input("What is the biggest number you want to check?   "))

# if number is less than two then raise exception
if inputRange < 2:
    raise Exception('Number cannot be smaller than 2!');

candidate = 2           # 2 is the smallest prime number
primeCandidates = []    # will hold every number that can be a prime number   

# add to the array all numbers between 2 and the selected number
while candidate<=inputRange:
    primeCandidates.append(candidate)
    candidate += 1

numCandidates = len(primeCandidates)    # how many numbers are there in the array.

'''
Simply uncomment the line that has the ## to see how it eliminates candidates.
WARNING: do not pick a number bigger than 20 as doing this will slow your computer down.
''' 
count = 0
for prime in primeCandidates:
    if prime:
        index = count   # start with the first candidate
        while index < numCandidates:
            index += prime
            if index < numCandidates:
                primeCandidates[index] = 0; # eliminate the numbers that are divisible by the candidate.
##                print(primeCandidates)              
    count += 1  # go to the next candidate.

# simply print every single number that passed the test.
for prime in primeCandidates:
    if prime:   # if a number equals 0, it will not pass.
        print(prime)
    

    

